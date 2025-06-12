import multiavatar from '@multiavatar/multiavatar/esm';
import {ChevronRightIcon} from '@primer/octicons-react'

const trendingData = [
  { title: 'Alanzoka', subtitle: 'Podcasts e gaming content' },
  { title: 'Cristiano Colombo', subtitle: 'Podcasts' },
  { title: 'Ricardo Maroquio', subtitle: 'Game Content Creator' },
  { title: 'Gabriel Natalli', subtitle: 'Political commentary' },
  { title: 'underlinetch', subtitle: 'Designer' },
  { title: 'gabrielsarte', subtitle: 'Creator' },
  { title: 'Amorian Skies', subtitle: 'Development Team on Roblox' },
];

function TrendingCard({ title, subtitle }) {
  const svgCode = multiavatar(title);

  return (
    <div className="flex-shrink-0 w-48 mr-4 bg-white rounded-lg shadow p-4 hover:cursor-pointer hover:bg-gray-100">
      <div
        className="w-24 h-24 mx-auto mb-2"
        dangerouslySetInnerHTML={{ __html: svgCode }}
      />
      <h3 className="text-md font-bold text-center">{title}</h3>
      <p className="text-sm text-gray-500 text-center">{subtitle}</p>
    </div>
  );
}

export default function TrendingSection() {
  return (
    <section className="px-6 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Em alta esta semana</h2>
      </div>
      <div className="flex w-full justify-between items-center">
        {trendingData.map(item => (
          <TrendingCard key={item.title} {...item} />
        ))}
        <ChevronRightIcon></ChevronRightIcon>
      </div>
    </section>
  );
}