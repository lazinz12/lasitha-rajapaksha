import { Helmet } from "react-helmet";
import { PasswordGenerator as PasswordGeneratorTool } from "@/components/tools/PasswordGenerator";
import Header from "@/components/Header";

const PasswordGeneratorPage = () => {
  return (
    <>
      <Helmet>
        <title>Password Generator Tool - Create Secure Passwords | Lasitha Rajapaksha</title>
        <meta
          name="description"
          content="Free online tool to generate secure passwords. Customize length and character types for strong, random passwords."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Password Generator Tool</h1>
          <p className="text-gray-600 mb-8">
            Generate secure, random passwords with customizable options. Choose length,
            character types, and easily copy generated passwords.
          </p>
          <PasswordGeneratorTool />
        </main>
      </div>
    </>
  );
};

export default PasswordGeneratorPage;