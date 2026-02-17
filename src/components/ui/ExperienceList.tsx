export default function ExperienceList() {
    return (
        <div className="relative w-full text-white">
            {/* Top divider */}
            <div className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] border-t border-white/20" />

            {ITEMS.map((item, i) => (
                <div key={i} className="group glitch-hover" data-cursor="large">
                    <div className="grid grid-cols-12 gap-6 px-6 py-10">
                        {/* Left title */}
                        <div className="col-span-12 md:col-span-4 text-sm tracking-wide text-white/70 group-hover:text-white transition">
                            <div className="flex flex-col gap-1">
                                <span className="uppercase text-white/50">
                                    {item.position}
                                </span>
                                <span data-text={item.company}>{item.company}</span>
                                <span className="text-xs text-white/50">{item.dates}</span>
                            </div>
                        </div>

                        {/* Right description */}
                        <div className="col-span-12 md:col-span-8 text-sm leading-relaxed text-white/80 group-hover:text-white transition">
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
        position: "IT Technician",
        company: "Canada's Wonderland",
        dates: "Jun. 2023 - Jan. 2026",
        details: [
            "Provisioned Windows PCs with MDT, and deployed scripting via PowerShell and ConnectWise.",
            "Managed AD accounts to propagate ACLs and unified access across in-house apps, Exchange, and SharePoint.",
            "Configured Cisco CUCM, Unity, and Finesse for stable call routing and voicemail services.",
            "Handled switch patching and VLAN/routing via PuTTY & SecureCRT, ensuring stable network performance.",
            "Deployed Oracle POS/KDS/Debit solutions (EMC, Simphony), tracking updates in Jira & Confluence.",
        ],
    },
    {
        position: "Back Office Technical Support",
        company: "Vodafone A.E",
        dates: "2021 - 2023",
        details: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        ],
    },
];
