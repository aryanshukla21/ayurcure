import React from 'react';
import { FileUpload } from './FileUpload';
import { Button } from '../../common/Button';

export const IntakeForm = () => {
    return (
        <div className="bg-white w-full p-8 md:p-10 rounded-[32px] shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Tell us how you're feeling</h3>
            <p className="text-gray-500 text-sm mb-8">
                Provide details about your current health concerns for a personalized Ayurvedic assessment.
            </p>

            <form className="space-y-6">
                {/* Primary Concern Input */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Primary Concern <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Chronic back pain, persistent migraines, digestive issues"
                        className="w-full p-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-ayur-orange focus:border-transparent transition-all"
                        required
                    />
                </div>

                {/* Duration Select */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Duration of Symptoms <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                            className="w-full p-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-ayur-orange focus:border-transparent transition-all text-gray-600 appearance-none cursor-pointer"
                            required
                            defaultValue=""
                        >
                            <option value="" disabled hidden>Select duration</option>
                            <option value="days">Less than a week</option>
                            <option value="weeks">1-4 weeks</option>
                            <option value="months">1-6 months</option>
                            <option value="years">More than 6 months</option>
                        </select>
                        {/* Custom dropdown arrow */}
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            ▼
                        </span>
                    </div>
                </div>

                {/* Additional Notes Textarea */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Additional Notes (Optional)
                    </label>
                    <textarea
                        rows="4"
                        placeholder="Describe any other patterns, triggers, or feelings related to your concern..."
                        className="w-full p-4 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-ayur-orange focus:border-transparent transition-all resize-none"
                    ></textarea>
                </div>

                {/* File Upload Zone */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Medical Reports or Photos (Optional)
                    </label>
                    <FileUpload />
                </div>

                {/* Form Actions */}
                <div className="flex flex-col-reverse sm:flex-row justify-between items-center pt-8 mt-8 border-t border-gray-100 gap-4">
                    <button
                        type="button"
                        className="text-gray-500 font-bold hover:text-gray-800 transition-colors flex items-center gap-2"
                    >
                        ← Previous
                    </button>

                    <Button variant="primary" type="submit" className="w-full sm:w-auto bg-ayur-orange text-white px-8 py-3.5 rounded-xl font-bold shadow-md hover:bg-orange-600 transition-colors">
                        Continue to Summary →
                    </Button>
                </div>
            </form>
        </div>
    );
};