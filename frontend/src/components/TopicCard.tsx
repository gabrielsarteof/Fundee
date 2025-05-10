export default function TopicCard({ label, bgColor }: { label: string; bgColor: string }) {
  return (
    <div className={`${bgColor} flex items-center justify-center rounded-lg text-white font-semibold h-24 w-52 flex-shrink-0 mr-4`}>  
      {label}
    </div>
  );
}