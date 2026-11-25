import { TextSegment } from '../types';

interface EditorialComparisonProps {
  label?: string;
  before: TextSegment[];
  after: TextSegment[];
  editorNote: string;
}

export function EditorialComparison({
  label,
  before,
  after,
  editorNote,
}: EditorialComparisonProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#E4DFD5] bg-[#F2EFE9]">
      {label && (
        <div className="border-b border-[#E4DFD5] bg-[#EBE6DC]/60 px-5 py-3 sm:px-7">
          <p className="font-sans text-[12px] font-semibold tracking-[0.06em] text-[#5C6360] uppercase">
            {label}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 divide-y divide-[#E4DFD5] md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* Left Column: Draf Awal (Sebelum) */}
        <div className="p-5 sm:p-7">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="font-sans text-[11px] font-semibold tracking-[0.08em] text-[#5C6360] uppercase">
              Draf Awal (Sebelum)
            </span>
            <span className="font-sans text-[11px] text-[#87736D]">
              Coretan redaksi
            </span>
          </div>
          <p className="font-serif text-[16px] leading-[1.75] text-[#5C6360] sm:text-[17px]">
            {before.map((segment, index) => {
              if (segment.type === 'removed') {
                return (
                  <span
                    key={index}
                    className="rounded-sm bg-[#E8E3DA] px-0.5 text-[#87736D] line-through decoration-[#C06C54]/70 decoration-1"
                  >
                    {segment.text}
                  </span>
                );
              }
              return <span key={index}>{segment.text}</span>;
            })}
          </p>
        </div>

        {/* Right Column: Hasil Suntingan (Sesudah) */}
        <div className="bg-[#FAF9F6]/60 p-5 sm:p-7">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="font-sans text-[11px] font-semibold tracking-[0.08em] text-[#914731] uppercase">
              Hasil Suntingan (Sesudah)
            </span>
            <span className="font-sans text-[11px] text-[#914731]">
              Siap terbit
            </span>
          </div>
          <p className="font-serif text-[16px] leading-[1.75] text-[#1F2421] sm:text-[17px]">
            {after.map((segment, index) => {
              if (segment.type === 'added') {
                return (
                  <span
                    key={index}
                    className="rounded-sm bg-[#C06C54]/14 px-0.5 text-[#76321E]"
                  >
                    {segment.text}
                  </span>
                );
              }
              return <span key={index}>{segment.text}</span>;
            })}
          </p>
        </div>
      </div>

      {/* Editorial Note Footer */}
      <div className="border-t border-[#E4DFD5] bg-[#FAF9F6] px-5 py-4 sm:px-7">
        <p className="font-sans text-[13px] leading-[1.65] text-[#5C6360]">
          <span className="font-semibold text-[#1F2421]">Catatan Penyunting: </span>
          {editorNote}
        </p>
      </div>
    </div>
  );
}
