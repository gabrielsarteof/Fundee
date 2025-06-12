import TopicCard from './TopicCard';

const topics = [
  { label: 'Podcasts e shows', bgColor: 'bg-red-600' },
  { label: 'Jogos de mesa', bgColor: 'bg-blue-600' },
  { label: 'Música', bgColor: 'bg-orange-500' },
  { label: 'Escrita', bgColor: 'bg-pink-300' },
  { label: 'Aplicativos e software', bgColor: 'bg-indigo-600' },
  { label: 'Avatares', bgColor: 'bg-indigo-400' },
  { label: 'Metaverso', bgColor: 'bg-gray-900' },
];

export default function TopicSection() {
  return (
    <section className="px-6 py-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Explorar tópicos</h2>
      <div className="flex w-full justify-between overflow-x-auto">
        {topics.map(t => (
          <TopicCard key={t.label} {...t} />
        ))}
      </div>
    </section>
  );
}