export default function ExperienceList() {
    return (
        <div className="relative w-full text-white">
            {/* Top divider */}
            <div className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] border-t border-white/20" />

            {ITEMS.map((item, i) => (
                <div key={i} className="group glitch-hover" data-cursor="large">
                    <div className="grid grid-cols-12 gap-6 pl-10 pr-6 py-10 md:pl-16 md:pr-6">
                        {/* Left title */}
                        <div className="col-span-12 md:col-span-4 text-[length:var(--fs-body-sm)] tracking-wide text-white/70 group-hover:text-white transition">
                            <div className="flex flex-col gap-1">
                                <span className="uppercase text-white/50">
                                    {item.position}
                                </span>
                                <span data-text={item.company}>{item.company}</span>
                                <span className="text-[length:var(--fs-ui)] text-white/50">{item.dates}</span>
                                <div className="mt-3 flex flex-wrap gap-2.5">
                                    {item.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex whitespace-nowrap items-center border border-white/30 px-2.5 py-1 text-[length:var(--fs-ui)] tracking-wide text-white/75"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right description */}
                        <div className="col-span-12 md:col-span-8 text-[length:var(--fs-body-sm)] leading-relaxed text-white/80 group-hover:text-white transition">
                            <ul className="space-y-2">
                                {item.details.map((detail, detailIndex) => (
                                    <li key={detailIndex}>- {detail}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Divider line */}
                    <div className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] border-t border-white/15 group-hover:border-white/30 transition" />
                </div>
            ))}
        </div>
    );
}

const ITEMS = [
    {
        position: "Full Stack Developer",
        company: "Existanze #connectingdots",
        dates: "Jan 2023 - Sep 2025",
        tags: [
            "Vue.js",
            "Node.js",
            "TypeScript",
            "MongoDB",
            "REST APIs",
            "Cloud Platforms",
            "Docker",
            "System Architecture",
            "Technical Leadership"
        ],
        details: [
            "Contributed to the development of a research-funded AI innovation platform built on a Node.js and MongoDB architecture, delivering data-driven applications for business ideation and creative workflows.",
            "Architected and implemented API integration layers, orchestrating secure data flow between distributed frontend and backend systems.",
            "Developed advanced Vue.js interfaces supporting complex workflows and real-time interactions.",
            "Designed backend features and data models using MongoDB to support scalable and maintainable application logic.",
            "Contributed to an EU-funded cloud orchestration initiative, building GUI and controller components for distributed and container-based deployments.",
            "Led frontend architecture and system integrations for enterprise clients in the maritime industry.",
            "Coordinating development team efforts and reviewing deliverables to ensure code quality and alignment with architectural standards.",
            "Improved deployment reliability through structured containerized and environment-aware workflows."
        ],
    },
    {
        position: "Web Developer",
        company: "Existanze #connectingdots",
        dates: "Jul 2021 - Dec 2023",
        tags: [
            "PHP",
            "MySQL",
            "JavaScript",
            "LAMP Stack",
            "CMS & eCommerce Systems",
            "Infrastructure & Deployment"
        ],
        details: [
            "Developed and maintained PHP-based web applications within LAMP environments for clients in eCommerce, automotive, maritime, and education sectors.",
            "Built and extended PHP-based eCommerce and content platforms, implementing custom backend logic and database-driven features, supporting B2B and product-driven businesses.",
            "Managed production environments, including server configuration, deployments, and troubleshooting across application and database layers.",
            "Maintained and supported a regional automotive dealer network platform, resolving production issues in a high-availability environment.",
            "Worked with MySQL/MariaDB databases to implement backend features, optimize query performance, and manage data changes in production systems.",
            "Collaborated directly with clients to translate business requirements into scalable technical solutions."
        ],
    },
    {
        position: "Mandatory Military Service",
        company: "Hellenic Air Force (HAF)",
        dates: "Jun 2020 - Jun 2021",
        tags: ["Electronic Mail Systems", "Secure Communications", "Confidential Data"],
        details: [
            "Trained in electronic mail management and digital correspondence systems.",
            "Managed official communications following strict security procedures.",
            "Operated within a high-responsibility and confidential environment."
        ],
    },
    {
        position: "Back Office Technical Support",
        company: "Vodafone",
        dates: "Jun 2019 - Mar 2020 · Fulltime",
        tags: ["Technical Support", "CRM", "Incident Handling", "Network Troubleshooting"],
        details: [
            "Provided technical support for network and service-related issues, collaborating customers to resolve incidents efficiently.",
            "Diagnosed connectivity and service disruptions using internal CRM systems, monitoring tools, and knowledge base platforms.",
            "Performed root cause analysis, identified corrective actions, and ensured timely issue resolution within SLA targets.",
            "Managed incident tickets, documented troubleshooting steps, and maintained accurate case records in internal systems.",
            "Coordinated with field engineers to schedule service interventions when required."
        ],
    },
];
