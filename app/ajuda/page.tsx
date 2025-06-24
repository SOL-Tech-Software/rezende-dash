'use client'
import { MainLayout } from "../components/MainLayout";
import { PageHeader } from "../components/PageHeader";
import { HelpCircle, MessageSquare, BookOpen, Mail } from "lucide-react";
import { useNavbarTheme } from "../components/ThemeProvider";

export default function Ajuda() {
  const { theme } = useNavbarTheme();
  
  return (
    <MainLayout>
      <PageHeader
        title="Ajuda e Suporte"
        description="Obtenha ajuda e suporte para sua plataforma"
      />

      <div className="max-w-4xl mx-auto">
        <div className={`${theme === 'dark' ? ' bg-gradient-to-br from-white/5 to-white/10 opacity-30' : 'bg-white'} rounded-xl shadow-sm p-6`}>
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6 flex items-center gap-2`}>
            <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Ajuda e Suporte
          </h2>

          <div className="space-y-4">
            <a href="#" className={`flex items-center gap-4 p-4 ${theme === 'dark' ? 'bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15' : 'bg-gray-50 hover:bg-gray-100'} rounded-xl transition-colors`}>
              <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <BookOpen className={`w-6 h-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Documentação
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Guia completo de uso
                </p>
              </div>
            </a>

            <a href="#" className={`flex items-center gap-4 p-4 ${theme === 'dark' ? 'bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15' : 'bg-gray-50 hover:bg-gray-100'} rounded-xl transition-colors`}>
              <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100'}`}>
                <MessageSquare className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div>
                <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  FAQ
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  Perguntas frequentes
                </p>
              </div>
            </a>

            <a href="#" className={`flex items-center gap-4 p-4 ${theme === 'dark' ? 'bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15' : 'bg-gray-50 hover:bg-gray-100'} rounded-xl transition-colors`}>
              <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-pink-900' : 'bg-pink-100'}`}>
                <Mail className={`w-6 h-6 ${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'}`} />
              </div>
              <div>
                <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Contato
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  suporte@rezende.com
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 