import { Layout } from "@/components/layout/Layout";
import { JourneyStory } from "@/components/journey/JourneyStory";
import { useDocumentTitle } from "@/hooks/use-document-title";

const Journey = () => {
  useDocumentTitle("My Journey");
  return (
    <Layout>
      <JourneyStory />
    </Layout>
  );
};

export default Journey;
