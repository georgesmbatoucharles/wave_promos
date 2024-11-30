import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { countries } from '../data/countries';

export const CountrySelection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-wave-primary relative overflow-hidden">
      {/* Background Wave Pattern */}
      <div className="absolute bottom-0 left-0 w-full h-64 opacity-10">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path 
            fill="white" 
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Admin Link */}
      <Link
        to="/admin/login"
        className="fixed bottom-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all transform hover:scale-110 z-50"
        title="Administration"
      >
        <Lock className="w-6 h-6 text-white" />
      </Link>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-4 items-center max-w-6xl mx-auto">
          {/* Left Column - Text Content */}
          <div className="text-white space-y-8">
            <h1 className="text-6xl font-bold leading-tight">
              Votre allié<br />
              mobile money
            </h1>
            
            <div className="space-y-4 text-2xl font-light">
              <p>Déposez et retirez gratuitement.</p>
              <p>Payez vos factures sans frais.</p>
              <p>Transferez de l'argent pour 1%.</p>
            </div>

            {/* App Store Badges */}
            <div className="flex flex-wrap gap-4">
              <a href="#" className="hover:opacity-90 transition-opacity">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Get it on Google Play"
                  className="h-16"
                />
              </a>
              <a href="#" className="hover:opacity-90 transition-opacity">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Download on the App Store"
                  className="h-16"
                />
              </a>
            </div>

            {/* Country Selection */}
            <div className="pt-8">
              <h3 className="text-2xl font-medium mb-6">
                {t('welcome.selectCountry')}
              </h3>
              <div className="flex flex-wrap gap-4">
                {countries.map((country) => (
                  <Link
                    key={country.code}
                    to={`/${country.code.toLowerCase()}`}
                    className="group bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl transition-all flex items-center space-x-4 cursor-pointer transform hover:scale-105"
                  >
                    <img
                      src={country.flagUrl}
                      alt={country.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-xl group-hover:font-medium transition-all">
                      {country.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Phone Mockup */}
          <div className="relative">
            <div className="bg-white rounded-[2.5rem] p-4 shadow-2xl max-w-[380px] mx-auto">
              <div className="bg-[#6366F1] rounded-[2rem] overflow-hidden">
                {/* Status Bar */}
                <div className="flex justify-between items-center px-6 py-3 text-white/90 text-sm">
                  <div>9:41 AM</div>
                  <div className="flex items-center gap-1">
                    <span>100%</span>
                  </div>
                </div>

                {/* Balance */}
                <div className="text-center py-8 text-white">
                  <div className="text-4xl font-bold">120.000F</div>
                </div>

                {/* QR Code Area */}
                <div className="bg-white/10 mx-6 rounded-xl p-4 mb-8">
                  <div className="aspect-square bg-white rounded-lg flex items-center justify-center">
                    <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="grid grid-cols-3 gap-4 px-6 pb-6 text-center text-white/90">
                  <div>TRANSFERT</div>
                  <div>PAIEMENTS</div>
                  <div>CRÉDIT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};