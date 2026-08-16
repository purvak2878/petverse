import { FaPaw } from "react-icons/fa";

function PawBackground() {
    const paws = [
        { top: "7%", left: "5%", size: "text-5xl", rotate: "-rotate-12" },
        { top: "18%", left: "22%", size: "text-4xl", rotate: "rotate-12" },
        { top: "5%", left: "53%", size: "text-5xl", rotate: "-rotate-12" },
        { top: "12%", left: "82%", size: "text-6xl", rotate: "rotate-12" },
        { top: "36%", left: "12%", size: "text-4xl", rotate: "rotate-12" },
        { top: "42%", left: "91%", size: "text-5xl", rotate: "-rotate-12" },
        { top: "63%", left: "7%", size: "text-5xl", rotate: "rotate-12" },
        { top: "70%", left: "30%", size: "text-4xl", rotate: "-rotate-12" },
        { top: "60%", left: "72%", size: "text-5xl", rotate: "rotate-12" },
        { top: "86%", left: "52%", size: "text-4xl", rotate: "-rotate-12" },
        { top: "82%", left: "88%", size: "text-5xl", rotate: "rotate-12" },
        { top: "30%", left: "47%", size: "text-4xl", rotate: "rotate-12" },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

            {paws.map((paw, index) => (
                <FaPaw
                    key={index}
                    className={`
                        absolute
                        ${paw.size}
                        ${paw.rotate}
                        text-slate-500/60
                    `}
                    style={{
                        top: paw.top,
                        left: paw.left,
                    }}
                />
            ))}

        </div>
    );
}

export default PawBackground;