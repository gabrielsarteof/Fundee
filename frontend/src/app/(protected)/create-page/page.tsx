'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { createPage } from '@/services/page';

const schema = z.object({
  pageName: z.string().min(1, 'Digite um nome para a sua página'),
  slug: z
    .string()
    .min(1, 'Digite um slug válido')
    .regex(/^[a-z0-9-]+$/, 'O slug só pode conter letras minúsculas, números e hífens'),
});

type FormData = z.infer<typeof schema>;

export default function CreatePage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { pageName: '', slug: '' },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const page = await createPage({ name: data.pageName, slug: data.slug });
      router.push(`/page/${page.slug}`); // atualizado de /user para /page
    } catch (err) {
      console.error(err);
      alert('Erro ao criar a página');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 shadow rounded-lg space-y-6">
        <h1 className="text-center text-2xl font-semibold">
          Vamos dar personalidade à sua página
        </h1>
        <p className="text-center text-gray-600">
          Você pode usar algo criativo ou começar com seu nome. Não se preocupe, você pode mudar quando quiser.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nome da Página"
              {...register('pageName')}
              className={`w-full px-4 py-2 border rounded focus:outline-none ${
                errors.pageName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.pageName && <p className="mt-1 text-sm text-red-500">{errors.pageName.message}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Slug da Página"
              {...register('slug')}
              className={`w-full px-4 py-2 border rounded focus:outline-none ${
                errors.slug ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition disabled:opacity-50"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}