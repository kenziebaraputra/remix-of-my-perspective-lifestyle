import { useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminStories from "@/components/admin/AdminStories";
import AdminJournals from "@/components/admin/AdminJournals";
import AdminIllustrations from "@/components/admin/AdminIllustrations";
import AdminMedia from "@/components/admin/AdminMedia";
import AdminSettings from "@/components/admin/AdminSettings";

type Section = "overview" | "stories" | "journals" | "illustrations" | "media" | "settings";

const Admin = () => {
  const [activeSection, setActiveSection] = useState<Section>("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview": return <AdminOverview />;
      case "stories": return <AdminStories />;
      case "journals": return <AdminJournals />;
      case "illustrations": return <AdminIllustrations />;
      case "media": return <AdminMedia />;
      case "settings": return <AdminSettings />;
    }
  };

  return (
    <AdminGuard>
      <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
        {renderSection()}
      </AdminLayout>
    </AdminGuard>
  );
};

export default Admin;
