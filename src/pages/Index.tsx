import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { useDocumentTitle } from "@/hooks/use-document-title";

const Index = () => {
  useDocumentTitle();
  return (
    <Layout>
      <HeroSection />
    </Layout>
  );
};

export default Index;
