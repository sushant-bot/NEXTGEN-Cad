import { Header } from "@/components/ui/header-05";

export default function DemoHeaderOne() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header /> 
      <main className="flex-1">
        <section className="h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">Hero Section</h1>
        </section> 
        <section className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <h1 className="text-4xl font-bold">Content Section</h1>
        </section>
      </main>
    </div>
  );
}
