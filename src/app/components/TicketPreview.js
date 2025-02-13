export default function TicketPreview({ fullName, email, avatarUrl }) {
    return (
      <div className="mt-6 p-4 border rounded-lg shadow-md bg-gray-50">
        <h2 className="text-xl font-bold">Your Conference Ticket</h2>
        <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full mx-auto my-4" />
        <p><strong>Name:</strong> {fullName}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
    );
  }
  