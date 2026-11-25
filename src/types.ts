export type WorkCategory = 'Semua' | 'Artikel & Esai' | 'Fiksi & Naskah' | 'Penyuntingan';

export type SpecificWorkCategory = Exclude<WorkCategory, 'Semua'>;

export interface TextSegment {
  text: string;
  type?: 'normal' | 'removed' | 'added';
}

export interface EditorialDiffBlock {
  label: string;
  before: TextSegment[];
  after: TextSegment[];
  editorNote: string;
}

export interface ScriptLine {
  type: 'scene' | 'action' | 'character' | 'parenthetical' | 'dialogue';
  text: string;
}

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  quote?: {
    text: string;
    attribution: string;
  };
  scriptExcerpt?: {
    title: string;
    lines: ScriptLine[];
  };
  editorialDiff?: EditorialDiffBlock;
}

export interface ArticleWork {
  id: string;
  title: string;
  subtitle: string;
  category: SpecificWorkCategory;
  formatLabel: string;
  publication: string;
  year: string;
  readTime: string;
  role: string;
  excerpt: string;
  featuredQuote?: string;
  tags: string[];
  sections: ArticleSection[];
  closingNote?: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface ComparisonShowcaseItem {
  id: string;
  category: string;
  projectTitle: string;
  client: string;
  before: TextSegment[];
  after: TextSegment[];
  editorNote: string;
}
