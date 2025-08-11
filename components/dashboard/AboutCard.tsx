export default function AboutCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">About Propeller</h3>
      <p className="text-gray-600 mb-4">
        Propeller is a front-end responsive framework based on Google's Material Design Standards & Bootstrap.
      </p>
      <p className="text-sm text-gray-500 mb-6">25 Components Available</p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        GET STARTED
      </button>
    </div>
  );
}
