'use client'
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { Power, Settings, Shield, Zap, Bot } from "lucide-react";
import { MainLayout } from "../components/MainLayout";
import { PageHeader } from "../components/PageHeader";

export default function Configuracoes() {
  const [botEnabled, setBotEnabled] = useState(true);
  const [botMode, setBotMode] = useState(true); // true = precisa aprovação, false = automático

  return (
    <MainLayout>
      <PageHeader
        title="Configurações"
        description="Gerencie as configurações do seu bot"
      />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Configurações do Bot
          </h2>

          <div className="space-y-8">
            {/* Status do Bot */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900">
                  <Power className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Status do Bot
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ativar ou desativar o bot
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${
                  botEnabled 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {botEnabled ? 'Ativo' : 'Inativo'}
                </span>
                <Switch
                  checked={botEnabled}
                  onChange={setBotEnabled}
                  className={`${
                    botEnabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-600'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      botEnabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
            </div>

            {/* Modo de Aprovação */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900">
                  <Shield className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Modo de Aprovação
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Requerer aprovação antes de enviar mensagens
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${
                  botMode 
                    ? 'text-yellow-600 dark:text-yellow-400' 
                    : 'text-green-600 dark:text-green-400'
                }`}>
                  {botMode ? 'Manual' : 'Automático'}
                </span>
                <Switch
                  checked={botMode}
                  onChange={setBotMode}
                  className={`${
                    botMode ? 'bg-yellow-600' : 'bg-gray-200 dark:bg-gray-600'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      botMode ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
            </div>

            {/* Modo Rápido */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900">
                  <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Modo Rápido
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Respostas automáticas para perguntas frequentes
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Em breve
                </span>
                <div className="h-6 w-11 rounded-full bg-gray-200 dark:bg-gray-600 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 