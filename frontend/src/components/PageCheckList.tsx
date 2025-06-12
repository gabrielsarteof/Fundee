import React from 'react';
import {
  MinusIcon,
  CameraIcon,
  ChatBubbleOvalLeftIcon,
  PencilSquareIcon,
  RocketLaunchIcon,
  PhoneArrowUpRightIcon,
  ChevronRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function PageChecklist() {
  return (
    <div className="max-w-1xl bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between p-6 border-b border-gray-200">
        <div className="pr-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Essa é a sua pagina! Descubra como deixá-lo a sua cara
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Adicione algumas informações para que os visitantes conheçam você melhor e saibam o que vai compartilhar aqui.
          </p>
          <p className="text-sm font-medium text-green-600 mt-3">
            1 de 5 concluídos
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-1">
          <MinusIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Checklist Items */}
      <ul>
        <li className="flex items-start p-6 border-b border-gray-100">
          <CameraIcon className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" />
          <div className="ml-4 flex-1">
            <p className="font-medium text-gray-900">Adicionar uma foto de perfil</p>
          </div>
          <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
        </li>

        <li className="flex items-start p-6 border-b border-gray-100">
          <ChatBubbleOvalLeftIcon className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" />
          <div className="ml-4 flex-1">
            <p className="font-medium text-gray-900">Descreva sua página</p>
            <p className="text-sm text-gray-500 mt-1">
              Conte para as pessoas quem é você e por que você usará o Patreon.
            </p>
            <p className="text-xs text-gray-400 italic mt-1">
              Dicas para escrever uma descrição
            </p>
          </div>
          <ChevronRightIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </li>

        <li className="flex items-start p-6 border-b border-gray-100">
          <PencilSquareIcon className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" />
          <div className="ml-4 flex-1">
            <p className="font-medium text-gray-900">Faça seu primeiro post público</p>
            <p className="text-sm text-gray-500 mt-1">
              Mostre aos fãs o que eles podem esperar com um post de boas-vindas ou um trabalho de bônus disponível para todos.
            </p>
            <p className="text-xs text-gray-400 italic mt-1">
              Dicas para seu primeiro post
            </p>
          </div>
          <ChevronRightIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </li>

        <li className="flex items-start p-6 border-b border-gray-100">
          <RocketLaunchIcon className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" />
          <div className="ml-4 flex-1">
            <p className="font-medium text-gray-900">Publicar sua página</p>
            <p className="text-sm text-gray-500 mt-1">
              É isso aí! Chegou a hora de publicar sua página.
            </p>
          </div>
          <ChevronRightIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </li>

        <li className="flex items-start p-6">
          <PhoneArrowUpRightIcon className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" />
          <div className="ml-4 flex-1">
            <p className="font-medium text-gray-900">Conte para todo mundo!</p>
            <p className="text-sm text-gray-500 mt-1">
              Compartilhe sua página com o público para que as pessoas comecem a participar.
            </p>
          </div>
          <ChevronRightIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </li>
      </ul>
    </div>
  );
}
