export default function TrendingCard({ title, subtitle, imageSrc }: { title: string; subtitle: string; imageSrc: string }) {
  return (
    <div className="w-48 flex-shrink-0 mr-4">
      <img src={imageSrc} alt={title} className="w-full h-32 object-cover rounded-md" />
      <h3 className="mt-2 font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}