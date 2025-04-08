export default function NasaCard({ data }) {
    const { title, explanation, date, url, media_type } = data;
  
    return (
      <div className="bg-white text-black rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{date}</p>
  
        {media_type === "image" ? (
          <img
            src={url}
            alt={title}
            className="rounded-lg mb-4 max-h-[400px] object-cover mx-auto"
          />
        ) : (
          <p className="text-red-500">This APOD is not an image (e.g., it&apos;s a video)</p>
        )}
  
        <p className="text-md">{explanation}</p>
      </div>
    );
  }
  