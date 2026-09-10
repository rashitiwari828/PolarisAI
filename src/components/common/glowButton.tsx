interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function GlowButton({
  children,
  onClick,
}: GlowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        group
        relative
        flex
        items-center
        justify-center
        gap-4
        overflow-hidden
        rounded-xl
        border
        border-cyan-400/60
        bg-cyan-500/10
        px-8
        py-4
        text-sm
        font-medium
        tracking-[0.08em]
        text-white
        transition-all
        duration-300
        hover:border-cyan-300
        hover:bg-cyan-400/15
        hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]
      "
    >
      <span>{children}</span>

      <span
        className="
          text-lg
          transition-transform
          duration-300
          group-hover:translate-x-1
        "
      >
        →
      </span>
    </button>
  );
}