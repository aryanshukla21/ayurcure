import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Loader2 } from 'lucide-react';
import { consultationApi } from '../../api/consultationApi';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

const VideoConsultationRoom = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();

    const [localTracks, setLocalTracks] = useState({ videoTrack: null, audioTrack: null });
    const [remoteUsers, setRemoteUsers] = useState({});
    const [isJoined, setIsJoined] = useState(false);
    const [hasError, setHasError] = useState('');

    // UI states
    const [micOn, setMicOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);

    useEffect(() => {
        let isUnmounted = false;

        const initAgora = async () => {
            try {
                // 1. Fetch Token from your Backend (controller provides token, appId, channel)
                const response = await consultationApi.getCallToken(appointmentId);
                const { rtcToken, channelName, rtcUid, appId } = response.data || response;

                // 2. Setup Event Listeners for remote users joining/leaving
                client.on("user-published", async (user, mediaType) => {
                    await client.subscribe(user, mediaType);
                    if (mediaType === "video") {
                        setRemoteUsers(prev => ({ ...prev, [user.uid]: user }));
                    }
                    if (mediaType === "audio") {
                        user.audioTrack.play();
                    }
                });

                client.on("user-unpublished", (user, mediaType) => {
                    if (mediaType === "video") {
                        setRemoteUsers(prev => {
                            const newUsers = { ...prev };
                            delete newUsers[user.uid];
                            return newUsers;
                        });
                    }
                });

                // 3. Join the Channel
                await client.join(appId, channelName, rtcToken, rtcUid);

                // 4. Create Local Tracks (Camera & Mic)
                const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();

                if (!isUnmounted) {
                    setLocalTracks({ audioTrack, videoTrack });
                    await client.publish([audioTrack, videoTrack]);
                    setIsJoined(true);
                }

            } catch (error) {
                console.error("Agora Init Failed", error);
                if (!isUnmounted) setHasError('Failed to join the consultation room.');
            }
        };

        initAgora();

        return () => {
            isUnmounted = true;
            // Cleanup on unmount
            if (localTracks.audioTrack) {
                localTracks.audioTrack.stop();
                localTracks.audioTrack.close();
            }
            if (localTracks.videoTrack) {
                localTracks.videoTrack.stop();
                localTracks.videoTrack.close();
            }
            client.leave();
        };
    }, [appointmentId]);

    // Handle Local Video DOM attachment
    useEffect(() => {
        if (localTracks.videoTrack) {
            localTracks.videoTrack.play('local-player');
        }
    }, [localTracks.videoTrack]);

    // Handle Remote Video DOM attachments
    useEffect(() => {
        Object.values(remoteUsers).forEach(user => {
            if (user.videoTrack) {
                user.videoTrack.play(`remote-player-${user.uid}`);
            }
        });
    }, [remoteUsers]);

    // Controls
    const toggleMic = async () => {
        if (localTracks.audioTrack) {
            await localTracks.audioTrack.setMuted(micOn);
            setMicOn(!micOn);
        }
    };

    const toggleVideo = async () => {
        if (localTracks.videoTrack) {
            await localTracks.videoTrack.setMuted(videoOn);
            setVideoOn(!videoOn);
        }
    };

    const handleEndCall = async () => {
        if (localTracks.audioTrack) {
            localTracks.audioTrack.stop();
            localTracks.audioTrack.close();
        }
        if (localTracks.videoTrack) {
            localTracks.videoTrack.stop();
            localTracks.videoTrack.close();
        }
        await client.leave();
        navigate('/patient/appointments');
    };

    if (hasError) {
        return <div className="h-screen flex items-center justify-center bg-gray-900 text-white font-sans">{hasError}</div>;
    }

    if (!isJoined) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white font-sans">
                <Loader2 className="w-12 h-12 text-[#52735B] animate-spin mb-4" />
                <h2 className="text-xl font-bold tracking-wide">Connecting to Secure Room...</h2>
            </div>
        );
    }

    return (
        <div className="h-screen bg-gray-950 flex flex-col relative font-sans overflow-hidden">

            {/* Header */}
            <div className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
                <h1 className="text-white text-xl font-bold tracking-wide">Clinical Consultation</h1>
                <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-extrabold tracking-widest border border-red-500/30 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> SECURE
                </div>
            </div>

            {/* Video Grid */}
            <div className="flex-1 relative flex items-center justify-center p-4">
                {/* Remote User (Doctor) */}
                {Object.keys(remoteUsers).length === 0 ? (
                    <div className="text-center text-gray-500">
                        <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-600 font-bold text-2xl">Doc</div>
                        <p>Waiting for Doctor to join...</p>
                    </div>
                ) : (
                    Object.values(remoteUsers).map(user => (
                        <div key={user.uid} id={`remote-player-${user.uid}`} className="w-full h-full rounded-3xl overflow-hidden object-cover border border-gray-800 shadow-2xl"></div>
                    ))
                )}

                {/* Local User (Patient) - Picture in Picture */}
                <div
                    id="local-player"
                    className="absolute bottom-24 right-8 w-32 h-48 md:w-48 md:h-72 bg-gray-800 rounded-2xl overflow-hidden border-2 border-gray-700 shadow-2xl object-cover"
                ></div>
            </div>

            {/* Bottom Control Bar */}
            <div className="absolute bottom-0 left-0 w-full p-6 pb-8 z-20 flex justify-center items-center gap-6 bg-gradient-to-t from-black/80 to-transparent">
                <button
                    onClick={toggleMic}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${micOn ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'}`}
                >
                    {micOn ? <Mic size={24} /> : <MicOff size={24} />}
                </button>

                <button
                    onClick={handleEndCall}
                    className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all transform hover:scale-105"
                >
                    <PhoneOff size={28} />
                </button>

                <button
                    onClick={toggleVideo}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${videoOn ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'}`}
                >
                    {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
                </button>
            </div>
        </div>
    );
};

export default VideoConsultationRoom;