import careerFrontend from "@/content/careers/frontend.json";

export type CareerSource = { name: string; url: string };

export type Career = {
  slug: string;
  title: string;
  updated_at: string;
  daily_routine: string[];
  top_tasks: string[];
  requirements: {
    must: string[];
    nice_to_have: string[];
    pitfalls: string[];
  };
  deliverables: string[];
  paths: {
    zero_to_one: string[];
    advanced: string[];
  };
  sources: CareerSource[];
};

export function getCareer(slug: string): Career {
  if (slug !== "frontend-engineer") return careerFrontend as Career;
  return careerFrontend as Career;
}
