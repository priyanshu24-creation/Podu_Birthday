import { createFileRoute } from "@tanstack/react-router";
import { ProposalExperience } from "@/components/proposal/ProposalExperience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Will You Be My Girlfriend? — A Letter For You" },
      { name: "description", content: "A cinematic, interactive love letter built just for you." },
      { property: "og:title", content: "Will You Be My Girlfriend?" },
      {
        property: "og:description",
        content: "A cinematic, interactive love letter built just for you.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <ProposalExperience />;
}
