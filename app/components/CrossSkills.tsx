type Props = {
  rows: number;
  columns?: number;
};

function CrossSkills({ rows, columns = 2 }: Props) {
  const safeRows = Math.max(rows, 1);
  const horizontalLines = Array.from(
    { length: Math.max(safeRows - 1, 0) },
    (_, index) => index + 1,
  );

  const verticalLines = Array.from(
    { length: Math.max(columns - 1, 0) },
    (_, index) => index + 1,
  );

  const rowIndexes = Array.from({ length: safeRows }, (_, index) => index);
  const columnIndexes = Array.from({ length: columns }, (_, index) => index);
  const cellHeight = `${100 / safeRows}%`;
  const cellWidth = `${100 / columns}%`;

  const highlightPalette = [
    "radial-gradient(circle at top left, rgba(0,255,128,0.28), transparent 72%)",
    "radial-gradient(circle at top center, rgba(255,235,59,0.25), transparent 72%)",
    "radial-gradient(circle at top right, rgba(255,128,0,0.26), transparent 72%)",
    "radial-gradient(circle at center left, rgba(0,180,255,0.27), transparent 74%)",
    "radial-gradient(circle at center, rgba(0,255,196,0.23), transparent 74%)",
    "radial-gradient(circle at center right, rgba(176,96,255,0.26), transparent 74%)",
    "radial-gradient(circle at bottom left, rgba(255,80,80,0.28), transparent 72%)",
    "radial-gradient(circle at bottom center, rgba(111,196,255,0.24), transparent 72%)",
    "radial-gradient(circle at bottom right, rgba(255,64,255,0.26), transparent 72%)",
  ];

  return (
    <>
      <div className="pointer-events-none absolute h-full w-full">
        {verticalLines.map((lineIndex) => (
          <div
            key={`vertical-${lineIndex}`}
            className="absolute h-full w-[2px] -translate-x-1/2"
            style={{
              left: `${(lineIndex / columns) * 100}%`,
              background:
                "linear-gradient(to bottom, transparent,#6aceff 10% ,#6aceff 90% ,transparent)",
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute h-full w-full">
        {horizontalLines.map((lineIndex) => (
          <div
            key={`horizontal-${lineIndex}`}
            className="absolute h-[2px] w-full -translate-y-1/2"
            style={{
              top: `${(lineIndex / safeRows) * 100}%`,
              background:
                "linear-gradient(to right, transparent, #6aceff 10%, #6aceff 90%, transparent)",
            }}
          />
        ))}
      </div>

      {rowIndexes.map((rowIndex) =>
        columnIndexes.map((columnIndex) => {
          const paletteIndex =
            (rowIndex * columns + columnIndex) % highlightPalette.length;

          return (
            <div
              key={`overlay-${rowIndex}-${columnIndex}`}
              className="p-fluide-anim absolute cursor-default opacity-45 transition-opacity duration-300 hover:opacity-95"
              style={{
                top: `${(rowIndex / safeRows) * 100}%`,
                left: `${(columnIndex / columns) * 100}%`,
                height: cellHeight,
                width: cellWidth,
                background: highlightPalette[paletteIndex],
              }}
            />
          );
        }),
      )}
    </>
  );
}

export default CrossSkills;
