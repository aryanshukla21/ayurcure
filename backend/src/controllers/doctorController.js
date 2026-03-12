const DoctorModel = require('../models/doctorModel');
const db = require('../config/db');
const logger = require('../utils/logger');

const getDoctorId = async (userId, res) => {
    const profile = await DoctorModel.getProfileByUserId(userId);
    if (!profile) {
        res.status(404).json({ error: 'Doctor profile incomplete. Please submit your application first.' });
        return null;
    }
    return profile.id;
};

exports.searchDoctors = async (req, res) => {
    try {
        const { specialization } = req.query;
        const doctors = await DoctorModel.searchDoctors({ specialization });
        res.status(200).json({ doctors });
    } catch (error) {
        logger.error(`Search Doctors Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to search doctors.' });
    }
};

exports.submitProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const existingProfile = await DoctorModel.getProfileByUserId(userId);
        if (existingProfile) {
            return res.status(409).json({ error: 'Profile application already submitted.' });
        }
        const profile = await DoctorModel.createDoctorProfile(userId, req.body);
        res.status(201).json({ message: 'Application submitted for verification.', profile });
    } catch (error) {
        if (error.code === '23505') return res.status(409).json({ error: 'Medical registration number already in use.' });
        logger.error(`Submit Profile Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to submit profile.' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await DoctorModel.getFullProfile(req.user.id);
        if (!profile) return res.status(404).json({ error: 'Profile not found.' });
        res.status(200).json({ profile });
    } catch (error) {
        logger.error(`Get Profile Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch profile.' });
    }
};

// ==========================================
// SEEDING DATA ENDPOINT (All 20 Doctors)
// ==========================================
exports.seedDoctorsDatabase = async (req, res) => {
    try {
        const doctors = [
            {
                name: "Dr. Arjun Sharma", email: "dr.arjun.sharma@ayurvedaplatform.com", phone: "+91 98765 43210",
                qualifications: "MD (Ayurveda), PhD", registration_number: "AYUSH/REG/2004/DL/00123", specialization: "Panchakarma & Detoxification Therapy",
                experience_years: 20, consultation_fee: 800.00, location: "New Delhi, India", languages: ["Hindi", "English", "Sanskrit"],
                consultation_duration_mins: 30, availability_summary: "Mon–Sat, 9:00 AM – 6:00 PM", publications_count: 18, rating: 4.9, reviews: 1200,
                bio: "Dr. Arjun Sharma is a leading Panchakarma expert with over two decades of clinical practice. He specializes in comprehensive detoxification protocols, chronic disease management through classical Ayurvedic methods, and preventive healthcare. He has treated over 15,000 patients and has been featured in leading Ayurvedic journals.",
                sub_specializations: ["Panchakarma Detox", "Chronic Disease Management", "Vata-Pitta-Kapha Balancing", "Stress & Burnout Recovery", "Digestive Disorders"],
                certifications: ["Certified Panchakarma Specialist – National Ayurvedic Medical Association", "Advanced Detox Therapy Certification – AYUSH Ministry", "Yoga & Ayurveda Integration – S-VYASA University"],
                education_details: [{ degree: "BAMS", institution: "Rajiv Gandhi Ayurvedic University, Bhopal", year: 2000 }, { degree: "MD (Panchakarma)", institution: "Gujarat Ayurved University, Jamnagar", year: 2003 }, { degree: "PhD (Ayurvedic Sciences)", institution: "Banaras Hindu University", year: 2007 }]
            },
            {
                name: "Dr. Priya Nair", email: "dr.priya.nair@ayurvedaplatform.com", phone: "+91 87654 32109",
                qualifications: "BAMS, MD (Stri Roga & Prasuti)", registration_number: "AYUSH/REG/2008/KL/00456", specialization: "Ayurvedic Gynecology & Women's Health",
                experience_years: 16, consultation_fee: 900.00, location: "Kochi, Kerala", languages: ["Malayalam", "English", "Hindi"],
                consultation_duration_mins: 30, availability_summary: "Mon–Fri, 10:00 AM – 5:00 PM", publications_count: 12, rating: 4.8, reviews: 980,
                bio: "Dr. Priya Nair is a specialist in Ayurvedic women's health with expertise in menstrual disorders, pregnancy care, PCOS, menopause management, and postnatal recovery. She blends classical Ayurvedic treatments with modern diagnostic understanding to provide holistic women's care.",
                sub_specializations: ["PCOS & Hormonal Imbalance", "Prenatal & Postnatal Care", "Menstrual Disorders", "Fertility Enhancement", "Menopause Management"],
                certifications: ["Certified Ayurvedic Gynecologist – AYUSH Board", "Prenatal Ayurveda Care – Kerala Ayurveda Academy", "Infertility & Reproductive Health – National Fertility Association"],
                education_details: [{ degree: "BAMS", institution: "Kerala University of Health Sciences, Thrissur", year: 2005 }, { degree: "MD (Stri Roga & Prasuti Tantra)", institution: "Govt. Ayurveda College, Thiruvananthapuram", year: 2008 }]
            },
            {
                name: "Dr. Vikram Patel", email: "dr.vikram.patel@ayurvedaplatform.com", phone: "+91 76543 21098",
                qualifications: "BAMS, MD (Kayachikitsa)", registration_number: "AYUSH/REG/2006/GJ/00789", specialization: "Internal Medicine & Lifestyle Disorders",
                experience_years: 18, consultation_fee: 750.00, location: "Ahmedabad, Gujarat", languages: ["Gujarati", "Hindi", "English"],
                consultation_duration_mins: 30, availability_summary: "Tue–Sun, 8:00 AM – 4:00 PM", publications_count: 22, rating: 4.9, reviews: 1450,
                bio: "Dr. Vikram Patel is a highly respected internist with deep expertise in treating lifestyle diseases such as diabetes, hypertension, obesity, and metabolic syndromes through classical Ayurvedic protocols. He is known for his precise Nadi Pariksha (pulse diagnosis) skills.",
                sub_specializations: ["Diabetes & Metabolic Syndrome", "Hypertension", "Obesity Management", "Liver & Digestive Disorders", "Nadi Pariksha"],
                certifications: ["Diabetes Management through Ayurveda – AYUSH Ministry", "Cardiac Health & Rasayana Therapy – National Institute of Ayurveda", "Nadi Pariksha Expert – Traditional Pulse Diagnosis Board"],
                education_details: [{ degree: "BAMS", institution: "Gujarat Ayurved University, Jamnagar", year: 2003 }, { degree: "MD (Kayachikitsa)", institution: "Institute of Post Graduate Teaching & Research, Jamnagar", year: 2006 }]
            },
            {
                name: "Dr. Ananya Menon", email: "dr.ananya.menon@ayurvedaplatform.com", phone: "+91 65432 10987",
                qualifications: "BAMS, MS (Shalya Tantra)", registration_number: "AYUSH/REG/2010/KA/01012", specialization: "Ayurvedic Surgery & Ksharasutra Therapy",
                experience_years: 14, consultation_fee: 1000.00, location: "Bengaluru, Karnataka", languages: ["Kannada", "English", "Hindi"],
                consultation_duration_mins: 30, availability_summary: "Mon–Sat, 9:00 AM – 3:00 PM", publications_count: 9, rating: 4.8, reviews: 760,
                bio: "Dr. Ananya Menon is a pioneer in Ayurvedic surgical procedures, specializing in Ksharasutra therapy for anorectal disorders, Agni Karma for pain management, and Leech therapy. She has successfully performed over 3,000 Ksharasutra procedures with excellent outcomes.",
                sub_specializations: ["Ksharasutra for Piles & Fistula", "Agni Karma Pain Therapy", "Leech Therapy", "Wound Management", "Varicose Vein Treatment"],
                certifications: ["Ksharasutra Therapy Specialist – Central Council of Indian Medicine", "Agni Karma Practitioner – National Ayurvedic Board", "Wound Care & Healing – AIIMS Collaboration Program"],
                education_details: [{ degree: "BAMS", institution: "Rajiv Gandhi University of Health Sciences, Bengaluru", year: 2007 }, { degree: "MS (Shalya Tantra)", institution: "SDM College of Ayurveda, Udupi", year: 2010 }]
            },
            {
                name: "Dr. Rajesh Kumar", email: "dr.rajesh.kumar@ayurvedaplatform.com", phone: "+91 54321 09876",
                qualifications: "BAMS, MD (Rasayana & Vajikarna)", registration_number: "AYUSH/REG/2005/UP/01345", specialization: "Rejuvenation Therapy & Anti-Aging",
                experience_years: 19, consultation_fee: 850.00, location: "Varanasi, Uttar Pradesh", languages: ["Hindi", "English", "Bhojpuri"],
                consultation_duration_mins: 30, availability_summary: "Mon–Fri, 10:00 AM – 6:00 PM", publications_count: 14, rating: 4.7, reviews: 890,
                bio: "Dr. Rajesh Kumar is a renowned Rasayana specialist who helps patients achieve optimal health, longevity, and vitality. He is particularly known for his work in male reproductive health, cognitive enhancement therapies, and classical Rasayana formulations using Suvarna Bhasma and Chyawanprash variants.",
                sub_specializations: ["Anti-Aging & Longevity", "Male Reproductive Health", "Cognitive Enhancement", "Immunity Boosting", "Chronic Fatigue Recovery"],
                certifications: ["Rasayana Chikitsa Expert – BHU Advanced Research Centre", "Anti-Aging & Longevity – World Ayurveda Congress", "Male Reproductive Health Specialist – CCIM"],
                education_details: [{ degree: "BAMS", institution: "Banaras Hindu University, Varanasi", year: 2002 }, { degree: "MD (Rasayana & Vajikarna)", institution: "National Institute of Ayurveda, Jaipur", year: 2005 }]
            },
            {
                name: "Dr. Deepa Iyer", email: "dr.deepa.iyer@ayurvedaplatform.com", phone: "+91 43210 98765",
                qualifications: "BAMS, MD (Kaumarabhritya/Balaroga)", registration_number: "AYUSH/REG/2011/TN/01678", specialization: "Ayurvedic Pediatrics & Child Wellness",
                experience_years: 13, consultation_fee: 700.00, location: "Chennai, Tamil Nadu", languages: ["Tamil", "English", "Hindi"],
                consultation_duration_mins: 30, availability_summary: "Mon–Sat, 9:00 AM – 5:00 PM", publications_count: 10, rating: 4.9, reviews: 1100,
                bio: "Dr. Deepa Iyer is dedicated to the health and well-being of children through Ayurvedic principles. She specializes in recurrent childhood infections, developmental delays, nutritional deficiencies, autism spectrum support, and building strong immunity in children using safe, natural remedies.",
                sub_specializations: ["Recurrent Infections in Children", "Developmental Delays", "Autism Support", "Childhood Nutrition", "Swarna Prashan Immunity"],
                certifications: ["Ayurvedic Pediatric Care – CCIM Certification", "Child Nutrition & Growth – NIN Hyderabad", "Autism & Developmental Disorders – AYUSH Research Institute"],
                education_details: [{ degree: "BAMS", institution: "Tamil Nadu Dr. M.G.R. Medical University, Chennai", year: 2008 }, { degree: "MD (Kaumarabhritya)", institution: "National Institute of Ayurveda, Jaipur", year: 2011 }]
            },
            {
                name: "Dr. Suresh Reddy", email: "dr.suresh.reddy@ayurvedaplatform.com", phone: "+91 32109 87654",
                qualifications: "BAMS, MD (Shalakya Tantra)", registration_number: "AYUSH/REG/2009/AP/02001", specialization: "Ayurvedic ENT & Eye Care",
                experience_years: 15, consultation_fee: 800.00, location: "Hyderabad, Telangana", languages: ["Telugu", "English", "Hindi"],
                consultation_duration_mins: 30, availability_summary: "Tue–Sun, 9:00 AM – 5:00 PM", publications_count: 11, rating: 4.8, reviews: 820,
                bio: "Dr. Suresh Reddy specializes in Shalakya Tantra, the Ayurvedic branch of ENT and ophthalmology. He is well-known for treating conditions like dry eyes, glaucoma support, sinusitis, tinnitus, and adenoid hypertrophy using classical procedures like Tarpana, Nasya, and Karnapoorana.",
                sub_specializations: ["Eye Disorders (Dry Eye, Glaucoma)", "Sinusitis & Allergic Rhinitis", "Tinnitus & Hearing Loss", "Tonsillitis & Adenoids", "Nasya Karma"],
                certifications: ["Netrachikitsa (Eye Care) Specialist – AYUSH Ministry", "Nasya Karma Expert – Kerala Ayurveda Academy", "Tinnitus & Hearing Loss Management – CCIM"],
                education_details: [{ degree: "BAMS", institution: "Dr. NTR University of Health Sciences, Vijayawada", year: 2006 }, { degree: "MD (Shalakya Tantra)", institution: "SDM College of Ayurveda, Udupi", year: 2009 }]
            },
            {
                name: "Dr. Kavitha Rao", email: "dr.kavitha.rao@ayurvedaplatform.com", phone: "+91 21098 76543",
                qualifications: "BAMS, MD (Prasuti Tantra & Stri Roga)", registration_number: "AYUSH/REG/2007/KA/02234", specialization: "Pregnancy Care & Reproductive Health",
                experience_years: 17, consultation_fee: 950.00, location: "Mysuru, Karnataka", languages: ["Kannada", "Hindi", "English"],
                consultation_duration_mins: 30, availability_summary: "Mon–Sat, 10:00 AM – 6:00 PM", publications_count: 15, rating: 4.9, reviews: 1300,
                bio: "Dr. Kavitha Rao offers compassionate and comprehensive care for women at all stages — from preconception and pregnancy to postpartum recovery. She integrates Garbhasanskar (prenatal education), Sutika Paricharya (postnatal care), and specialized treatments for infertility and gynecological disorders.",
                sub_specializations: ["Preconception & Fertility", "Garbhasanskar", "High-Risk Pregnancy", "Postpartum Recovery", "Fibroid & Cyst Management"],
                certifications: ["High-Risk Pregnancy & Ayurveda – CCIM", "Infertility & IVF Support with Ayurveda – AIIA", "Lactation Support Specialist – WHO Certification"],
                education_details: [{ degree: "BAMS", institution: "Rajiv Gandhi University of Health Sciences, Bengaluru", year: 2004 }, { degree: "MD (Prasuti Tantra & Stri Roga)", institution: "Ayurveda Mahavidyalaya, Hubli", year: 2007 }]
            },
            {
                name: "Dr. Mohan Verma", email: "dr.mohan.verma@ayurvedaplatform.com", phone: "+91 10987 65432",
                qualifications: "BAMS, PhD (Dravyaguna)", registration_number: "AYUSH/REG/2003/RJ/02567", specialization: "Ayurvedic Pharmacology & Herbal Medicine",
                experience_years: 21, consultation_fee: 900.00, location: "Jaipur, Rajasthan", languages: ["Rajasthani", "Hindi", "English"],
                consultation_duration_mins: 30, availability_summary: "Mon–Fri, 9:00 AM – 5:00 PM", publications_count: 28, rating: 4.8, reviews: 700,
                bio: "Dr. Mohan Verma is a distinguished pharmacologist and herbalist with exceptional expertise in Ayurvedic drug formulations, plant identification, and evidence-based herbal medicine. He consults patients on safe and effective herbal regimens and advises on drug interactions between Ayurvedic and allopathic medicines.",
                sub_specializations: ["Herbal Drug Formulation", "Drug Interaction Advisory", "Chronic Skin Disorders", "Autoimmune Conditions", "Adaptogen Therapy"],
                certifications: ["Medicinal Plant Identification & Authentication – CSIR", "Formulation Development – AYUSH Ministry", "Clinical Pharmacognosy – IIT Delhi Collaboration"],
                education_details: [{ degree: "BAMS", institution: "University of Rajasthan, Jaipur", year: 2000 }, { degree: "MD (Dravyaguna)", institution: "National Institute of Ayurveda, Jaipur", year: 2003 }, { degree: "PhD (Medicinal Plants)", institution: "CSIR-CIMAP, Lucknow", year: 2008 }]
            },
            {
                name: "Dr. Lakshmi Pillai", email: "dr.lakshmi.pillai@ayurvedaplatform.com", phone: "+91 09876 54321",
                qualifications: "BAMS, MD (Manovigyan & Manasaroga)", registration_number: "AYUSH/REG/2012/KL/02890", specialization: "Ayurvedic Psychiatry & Mental Wellness",
                experience_years: 12, consultation_fee: 850.00, location: "Thiruvananthapuram, Kerala", languages: ["Malayalam", "Tamil", "English"],
                consultation_duration_mins: 30, availability_summary: "Mon–Sat, 10:00 AM – 7:00 PM", publications_count: 13, rating: 4.9, reviews: 1050,
                bio: "Dr. Lakshmi Pillai is a compassionate mental wellness specialist blending Ayurvedic psychiatry with mindfulness practices. She specializes in anxiety, depression, sleep disorders, and stress-related illnesses using Sattvavajaya (cognitive therapy), Medhya Rasayanas (brain tonics), and lifestyle interventions.",
                sub_specializations: ["Anxiety & Depression", "Sleep Disorders", "Stress & Burnout", "OCD & Phobias", "Cognitive Decline Prevention"],
                certifications: ["Sattvavajaya Chikitsa – Mind Science Institute of Ayurveda", "Meditation & Ayurveda Integration – Bihar School of Yoga", "Psychosomatic Disorders – NIMHANS Collaboration"],
                education_details: [{ degree: "BAMS", institution: "Kerala University of Health Sciences, Thrissur", year: 2009 }, { degree: "MD (Manovigyan & Manasaroga)", institution: "Govt. Ayurveda College, Thiruvananthapuram", year: 2012 }]
            },
            {
                name: "Dr. Aditya Joshi", email: "dr.aditya.joshi@ayurvedaplatform.com", phone: "+91 98765 11223",
                qualifications: "BAMS, MD (Swasthavritta & Yoga)", registration_number: "AYUSH/REG/2010/MH/03123", specialization: "Preventive Health & Lifestyle Medicine",
                experience_years: 14, consultation_fee: 700.00, location: "Pune, Maharashtra", languages: ["Marathi", "Hindi", "English"],
                consultation_duration_mins: 30, availability_summary: "Tue–Sun, 7:00 AM – 4:00 PM", publications_count: 8, rating: 4.8, reviews: 930,
                bio: "Dr. Aditya Joshi is a preventive health expert who guides individuals and organizations on Ayurvedic daily routines, seasonal regimens, and yoga-integrated wellness programs. He conducts corporate wellness workshops, disease prevention programs, and personalized healthy lifestyle consultations.",
                sub_specializations: ["Corporate Wellness Programs", "Daily Routine Optimization", "Weight Management", "Immunity Enhancement", "Yoga-Ayurveda Integration"],
                certifications: ["Yoga Therapy Certification – S-VYASA University, Bengaluru", "Corporate Wellness Consultant – ASSOCHAM", "Dinacharya & Ritucharya Expert – AYUSH Ministry"],
                education_details: [{ degree: "BAMS", institution: "Maharashtra University of Health Sciences, Nashik", year: 2007 }, { degree: "MD (Swasthavritta)", institution: "SDM College of Ayurveda, Udupi", year: 2010 }]
            },
            {
                name: "Dr. Meera Krishnan", email: "dr.meera.krishnan@ayurvedaplatform.com", phone: "+91 87654 22334",
                qualifications: "BAMS, MD (Panchakarma)", registration_number: "AYUSH/REG/2009/TN/03456", specialization: "Panchakarma & Neurological Rehabilitation",
                experience_years: 15, consultation_fee: 1000.00, location: "Coimbatore, Tamil Nadu", languages: ["Tamil", "Malayalam", "English"],
                consultation_duration_mins: 30, availability_summary: "Mon–Sat, 8:00 AM – 5:00 PM", publications_count: 16, rating: 4.9, reviews: 880,
                bio: "Dr. Meera Krishnan is a neurological rehabilitation specialist using classical Panchakarma therapies for stroke recovery, Parkinson's disease support, multiple sclerosis, and spinal cord injuries. Her Marma therapy skills and expertise in Shirodhara and Pizhichil have helped hundreds regain functional independence.",
                sub_specializations: ["Stroke Rehabilitation", "Parkinson's Support", "Spinal Disorders", "Marma Therapy", "Paralysis Recovery"],
                certifications: ["Neurological Rehabilitation through Ayurveda – Amrita Institute", "Stroke Recovery Protocol – National Ayurvedic Board", "Marma Therapy Specialist – Kottakkal Arya Vaidya Sala"],
                education_details: [{ degree: "BAMS", institution: "Tamil Nadu Dr. M.G.R. Medical University, Chennai", year: 2006 }, { degree: "MD (Panchakarma)", institution: "Amrita School of Ayurveda, Kollam", year: 2009 }]
            },
            {
                name: "Dr. Sanjay Gupta", email: "dr.sanjay.gupta@ayurvedaplatform.com", phone: "+91 76543 33445",
                qualifications: "BAMS, MD (Agadatantra & Vishagarvairodh)", registration_number: "AYUSH/REG/2008/UP/03789", specialization: "Ayurvedic Toxicology & Environmental Health",
                experience_years: 16, consultation_fee: 800.00, location: "Lucknow, Uttar Pradesh", languages: ["Hindi", "English", "Urdu"],
                consultation_duration_mins: 30, availability_summary: "Mon–Fri, 10:00 AM – 6:00 PM", publications_count: 19, rating: 4.7, reviews: 560,
                bio: "Dr. Sanjay Gupta is a specialist in Ayurvedic toxicology and environmental health disorders. He treats heavy metal toxicity, pesticide poisoning aftereffects, occupational health hazards, and allergic reactions using specialized Shodhana (purification) and Shamana (pacification) protocols.",
                sub_specializations: ["Heavy Metal Detox", "Occupational Health Disorders", "Pesticide Toxicity Recovery", "Allergy & Hypersensitivity", "Skin Disorders from Environmental Exposure"],
                certifications: ["Clinical Toxicology – AIIMS Delhi Collaboration", "Heavy Metal Detoxification – AYUSH Research Institute", "Environmental Health & Ayurveda – WHO India Partnership"],
                education_details: [{ degree: "BAMS", institution: "King George's Medical University, Lucknow", year: 2005 }, { degree: "MD (Agadatantra)", institution: "Banaras Hindu University, Varanasi", year: 2008 }]
            },
            {
                name: "Dr. Rekha Nambiar", email: "dr.rekha.nambiar@ayurvedaplatform.com", phone: "+91 65432 44556",
                qualifications: "BAMS, MS (Prasuti Tantra)", registration_number: "AYUSH/REG/2013/KL/04012", specialization: "High-Risk Pregnancy & Neonatal Care",
                experience_years: 11, consultation_fee: 900.00, location: "Kozhikode, Kerala", languages: ["Malayalam", "Tamil", "English"],
                consultation_duration_mins: 30, availability_summary: "Mon–Sat, 9:00 AM – 5:00 PM", publications_count: 8, rating: 4.9, reviews: 740,
                bio: "Dr. Rekha Nambiar focuses on safe and holistic pregnancy journeys through Ayurveda. She supports high-risk pregnancies, recurrent miscarriages, gestational diabetes management, and comprehensive postnatal rehabilitation. Her gentle and evidence-based approach has made her one of the most sought-after practitioners in Kerala.",
                sub_specializations: ["High-Risk Pregnancy", "Recurrent Miscarriage", "Gestational Diabetes", "Neonatal Health", "Postnatal Rehabilitation"],
                certifications: ["High-Risk Pregnancy Management – ICOG Collaboration", "Neonatal Ayurvedic Care – Kerala Ayurveda Academy", "Lactation Consultant – IBLCE Certified"],
                education_details: [{ degree: "BAMS", institution: "Kerala University of Health Sciences", year: 2010 }, { degree: "MS (Prasuti Tantra)", institution: "Govt. Ayurveda College, Kozhikode", year: 2013 }]
            },
            {
                name: "Dr. Harish Bhat", email: "dr.harish.bhat@ayurvedaplatform.com", phone: "+91 54321 55667",
                qualifications: "BAMS, MD (Kayachikitsa)", registration_number: "AYUSH/REG/2006/KA/04345", specialization: "Rheumatology & Joint Disorder Management",
                experience_years: 18, consultation_fee: 850.00, location: "Mangaluru, Karnataka", languages: ["Kannada", "Tulu", "Hindi", "English"],
                consultation_duration_mins: 30, availability_summary: "Mon–Sat, 9:00 AM – 6:00 PM", publications_count: 20, rating: 4.8, reviews: 1100,
                bio: "Dr. Harish Bhat is a leading authority on Ayurvedic rheumatology, treating conditions like rheumatoid arthritis, gout, ankylosing spondylitis, osteoporosis, and fibromyalgia. His treatments combine internal herbal medicines, specialized Panchakarma procedures (Janu Basti, Kati Basti), and therapeutic yoga.",
                sub_specializations: ["Rheumatoid Arthritis", "Gout & Uric Acid", "Ankylosing Spondylitis", "Osteoporosis", "Fibromyalgia"],
                certifications: ["Rheumatoid Arthritis Management – AYUSH Ministry", "Bone & Joint Health – National Orthopaedic Association Collaboration", "Advanced Marma Chikitsa – Kerala Ayurveda Academy"],
                education_details: [{ degree: "BAMS", institution: "Rajiv Gandhi University of Health Sciences, Bengaluru", year: 2003 }, { degree: "MD (Kayachikitsa)", institution: "SDM College of Ayurveda, Udupi", year: 2006 }]
            },
            {
                name: "Dr. Sunita Desai", email: "dr.sunita.desai@ayurvedaplatform.com", phone: "+91 43210 66778",
                qualifications: "BAMS, PhD (Dravyaguna)", registration_number: "AYUSH/REG/2007/GJ/04678", specialization: "Ayurvedic Dermatology & Skin Care",
                experience_years: 17, consultation_fee: 800.00, location: "Surat, Gujarat", languages: ["Gujarati", "Hindi", "English"],
                consultation_duration_mins: 30, availability_summary: "Mon–Fri, 10:00 AM – 7:00 PM", publications_count: 17, rating: 4.9, reviews: 1250,
                bio: "Dr. Sunita Desai is a highly regarded dermatologist who uses time-tested Ayurvedic formulations for skin disorders. She specializes in psoriasis, eczema, vitiligo, acne, and skin rejuvenation. Her combination of internal herbal therapies, Lepa (medicated pastes), and Rakta Mokshana (bloodletting) therapies delivers outstanding results.",
                sub_specializations: ["Psoriasis & Eczema", "Vitiligo", "Acne & Rosacea", "Hair Loss & Scalp Disorders", "Skin Rejuvenation"],
                certifications: ["Clinical Dermatology – Ayurvedic Dermatology Association", "Lepa & External Therapies Expert – AYUSH Board", "Cosmetology & Ayurveda – VLCC Institute Collaboration"],
                education_details: [{ degree: "BAMS", institution: "Gujarat Ayurved University, Jamnagar", year: 2004 }, { degree: "MD (Dravyaguna)", institution: "Gujarat Ayurved University", year: 2007 }, { degree: "PhD (Skin Disorders & Herbal Remedies)", institution: "Annamalai University", year: 2012 }]
            },
            {
                name: "Dr. Kiran Malhotra", email: "dr.kiran.malhotra@ayurvedaplatform.com", phone: "+91 32109 77889",
                qualifications: "BAMS, MD (Rasayana)", registration_number: "AYUSH/REG/2011/DL/05001", specialization: "Sports Medicine & Musculoskeletal Rehabilitation",
                experience_years: 13, consultation_fee: 900.00, location: "Chandigarh", languages: ["Punjabi", "Hindi", "English"],
                consultation_duration_mins: 30, availability_summary: "Mon–Sat, 7:00 AM – 5:00 PM", publications_count: 11, rating: 4.8, reviews: 670,
                bio: "Dr. Kiran Malhotra is a pioneering Ayurvedic sports medicine expert consulting for athletes and fitness enthusiasts. He specializes in sports injury rehabilitation, performance enhancement through Rasayana therapies, muscle recovery, and pain management using classical and contemporary Ayurvedic techniques.",
                sub_specializations: ["Sports Injury Rehab", "Performance Enhancement", "Muscle Recovery", "Bone Density & Strength", "Pain Management"],
                certifications: ["Sports Injury Rehabilitation – National Sports Medicine Institute", "Ayurvedic Sports Nutrition – Indian Olympic Association", "Muscle Recovery & Rasayana – AYUSH Ministry"],
                education_details: [{ degree: "BAMS", institution: "Punjab Ayurvedic University, Patiala", year: 2008 }, { degree: "MD (Rasayana & Sports Medicine)", institution: "National Institute of Ayurveda, Jaipur", year: 2011 }]
            },
            {
                name: "Dr. Padma Subramanian", email: "dr.padma.subramanian@ayurvedaplatform.com", phone: "+91 21098 88990",
                qualifications: "BAMS, MD (Kaumarabhritya)", registration_number: "AYUSH/REG/2013/TN/05234", specialization: "Neonatal & Adolescent Health",
                experience_years: 11, consultation_fee: 750.00, location: "Madurai, Tamil Nadu", languages: ["Tamil", "Telugu", "English"],
                consultation_duration_mins: 30, availability_summary: "Tue–Sun, 10:00 AM – 6:00 PM", publications_count: 9, rating: 4.8, reviews: 810,
                bio: "Dr. Padma Subramanian specializes in neonatal health, adolescent wellness, and teenager-specific health challenges. She is known for her expertise in treating childhood epilepsy, hormonal issues in teenagers, attention deficit disorders, and building academic performance through Medhya Rasayana formulations.",
                sub_specializations: ["Neonatal Jaundice", "Adolescent Hormonal Issues", "ADHD & Learning Disabilities", "Childhood Epilepsy", "Swarna Prashan"],
                certifications: ["Neonatal Jaundice & Ayurveda – CCIM", "Adolescent Health & PCOD – National Ayurvedic Board", "Medhya Rasayana for Children – BHU Research Centre"],
                education_details: [{ degree: "BAMS", institution: "Tamil Nadu Dr. M.G.R. Medical University", year: 2010 }, { degree: "MD (Kaumarabhritya)", institution: "National Institute of Ayurveda, Jaipur", year: 2013 }]
            },
            {
                name: "Dr. Naresh Tiwari", email: "dr.naresh.tiwari@ayurvedaplatform.com", phone: "+91 10987 99001",
                qualifications: "BAMS, MS (Shalya Tantra)", registration_number: "AYUSH/REG/2008/MP/05567", specialization: "Ano-Rectal Disorders & Wound Healing",
                experience_years: 16, consultation_fee: 1000.00, location: "Bhopal, Madhya Pradesh", languages: ["Hindi", "Bundelkhandi", "English"],
                consultation_duration_mins: 30, availability_summary: "Mon–Sat, 8:00 AM – 4:00 PM", publications_count: 14, rating: 4.9, reviews: 1400,
                bio: "Dr. Naresh Tiwari is a highly experienced Ayurvedic surgeon specializing in non-invasive and minimally invasive treatment of piles, fistula, fissures, and complex wounds. He has performed over 5,000 Ksharasutra procedures and is also skilled in treating diabetic wounds and ulcers through classical Ayurvedic wound management.",
                sub_specializations: ["Piles & Hemorrhoids", "Anal Fistula & Fissure", "Pilonidal Sinus", "Diabetic Wound Care", "Ksharasutra Procedures"],
                certifications: ["Ksharasutra Master Practitioner – CCIM", "Advanced Wound Care – AIIMS Bhopal Collaboration", "Diabetic Wound Management – IDA Certified"],
                education_details: [{ degree: "BAMS", institution: "Rajiv Gandhi Ayurvedic University, Bhopal", year: 2005 }, { degree: "MS (Shalya Tantra)", institution: "Govt. Autonomous Ayurvedic College, Jabalpur", year: 2008 }]
            },
            {
                name: "Dr. Anjali Singh", email: "dr.anjali.singh@ayurvedaplatform.com", phone: "+91 09876 00112",
                qualifications: "BAMS, MD (Nidana Chikitsa/Roga Nidana)", registration_number: "AYUSH/REG/2012/WB/05890", specialization: "Ayurvedic Diagnostics & Integrative Medicine",
                experience_years: 12, consultation_fee: 950.00, location: "Kolkata, West Bengal", languages: ["Bengali", "Hindi", "English"],
                consultation_duration_mins: 30, availability_summary: "Mon–Sat, 10:00 AM – 7:00 PM", publications_count: 16, rating: 4.9, reviews: 990,
                bio: "Dr. Anjali Singh is an expert in Ayurvedic diagnostics and integrative medicine, bridging the gap between Ayurveda and modern medicine. She specializes in complex, multi-system chronic diseases, cancer supportive care, autoimmune conditions, and precise Prakriti (body constitution) analysis for personalized treatment planning.",
                sub_specializations: ["Complex Chronic Diseases", "Cancer Supportive Care", "Autoimmune Disorders", "Prakriti Analysis", "Integrative Medicine"],
                certifications: ["Integrative Medicine – AIIMS Kolkata Collaboration", "Clinical Diagnosis & Nadi Pariksha – Traditional Medicine Board", "Cancer Supportive Care through Ayurveda – AYUSH Ministry"],
                education_details: [{ degree: "BAMS", institution: "West Bengal University of Health Sciences, Kolkata", year: 2009 }, { degree: "MD (Roga Nidana & Vikriti Vigyan)", institution: "Institute of Post Graduate Ayurvedic Education & Research, Kolkata", year: 2012 }]
            }
        ];

        let addedCount = 0;
        for (const doc of doctors) {
            // Check if user exists to prevent duplication
            const checkUser = await db.query('SELECT id FROM Users WHERE email = $1', [doc.email]);
            if (checkUser.rows.length > 0) continue;

            // 1. Create User
            const userResult = await db.query(
                `INSERT INTO Users (role, full_name, email, phone, is_email_verified, account_status)
                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
                ['doctor', doc.name, doc.email, doc.phone, true, 'Active']
            );
            const userId = userResult.rows[0].id;

            // 2. Create Profile
            await DoctorModel.createDoctorProfile(userId, doc);
            addedCount++;
        }

        res.status(200).json({ success: true, message: `Successfully seeded ${addedCount} doctors.` });
    } catch (error) {
        logger.error(`Seed Error: ${error.message}`);
        res.status(500).json({ success: false, error: 'Failed to seed doctors.' });
    }
};

exports.updateAvailability = async (req, res) => {
    try {
        const doctorId = await getDoctorId(req.user.id, res);
        if (!doctorId) return;

        const availability = await DoctorModel.addAvailability(doctorId, req.body);
        res.status(201).json({ message: 'Availability added successfully.', availability });
    } catch (error) {
        logger.error(`Update Availability Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to add availability.' });
    }
};

exports.addArticle = async (req, res) => {
    try {
        const doctorId = await getDoctorId(req.user.id, res);
        if (!doctorId) return;

        const article = await DoctorModel.createArticle(doctorId, req.body);
        res.status(201).json({ message: 'Article submitted for review.', article });
    } catch (error) {
        logger.error(`Add Article Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to submit article.' });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const doctorId = await getDoctorId(req.user.id, res);
        if (!doctorId) return;

        const appointments = await DoctorModel.getAllAppointments(doctorId);
        res.status(200).json({ appointments });
    } catch (error) {
        logger.error(`Get Appointments Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch appointments.' });
    }
};

exports.getAppointment = async (req, res) => {
    try {
        const doctorId = await getDoctorId(req.user.id, res);
        if (!doctorId) return;

        const appointment = await DoctorModel.getAppointmentById(req.params.id, doctorId);
        if (!appointment) return res.status(404).json({ error: 'Appointment not found.' });

        res.status(200).json({ appointment });
    } catch (error) {
        logger.error(`Get Appointment Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch appointment.' });
    }
};

exports.getPatientProfile = async (req, res) => {
    try {
        const doctorId = await getDoctorId(req.user.id, res);
        if (!doctorId) return;

        const patientId = req.params.id;
        const profile = await DoctorModel.getPatientProfileForDoctor(patientId);

        if (!profile) return res.status(404).json({ error: 'Patient not found.' });

        res.status(200).json({ profile });
    } catch (error) {
        logger.error(`Get Patient Profile Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch patient profile.' });
    }
};