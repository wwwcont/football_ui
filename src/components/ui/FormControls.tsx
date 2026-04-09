import { Search } from 'lucide-react';

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className={`input ${props.className ?? ''}`} />;
export const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => <select {...props} className={`input ${props.className ?? ''}`} />;
export const Button = ({ variant = 'primary', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary' }) => <button {...props} className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${props.className ?? ''}`} />;
export const SearchInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => <div className="relative"><Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" /><Input {...props} className={`pl-9 ${props.className ?? ''}`} /></div>;
