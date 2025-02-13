import TicketForm from "./components/TicketForm";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Conference Ticket Generator</h1>
      <TicketForm />
    </main>
  );
}
