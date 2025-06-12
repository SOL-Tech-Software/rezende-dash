'use client'
import { MainLayout } from "../components/MainLayout";
import { PageHeader } from "../components/PageHeader";
import { HelpCircle, MessageSquare, BookOpen, Mail } from "lucide-react";

export default function Ajuda() {
  return (
    <MainLayout>
      <PageHeader
        title="Ajuda e Suporte"
        description="Obtenha ajuda e suporte para sua plataforma"
      />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Ajuda e Suporte
          </h2>

          <div className="space-y-4">
            <a href="#" className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Documentação
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Guia completo de uso
                </p>
              </div>
            </a>

            <a href="#" className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900">
                <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  FAQ
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Perguntas frequentes
                </p>
              </div>
            </a>

            <a href="#" className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="p-3 rounded-lg bg-pink-100 dark:bg-pink-900">
                <Mail className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Contato
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
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