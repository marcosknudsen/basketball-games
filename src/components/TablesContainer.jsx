export default function TablesContainer({children}) {
  return (
    <div
      className={`text-base text-gray-200 text-center flex justify-evenly w-9/12 gap-5 md:block md:w-full`}
    >
      {children}
    </div>
  );
}