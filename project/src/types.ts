export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface GeneratedCode {
  html: string;
  css: string;
  js: string;
}

export interface CodeModification {
  type: 'style' | 'content' | 'attribute';
  target: string;
  property?: string;
  value: string;
}