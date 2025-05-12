import { Professor } from "@/lib/types";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";

interface ProfessorSelectProps {
  professoresSelecionados: number[];
  onProfessorChange: (professoresIds: number[]) => void;
  className?: string;
}

export function FormProfessorInput({
  professoresSelecionados,
  onProfessorChange,
  className,
}: ProfessorSelectProps) {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetch("http://localhost:99/professores")
      .then((res) => res.json())
      .then((data: Professor[]) => setProfessores(data))
      .catch((err) => console.error("Erro ao buscar professores:", err));
  }, []);

  const filtered = professores.filter((p) =>
    p.nome.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (_nome: string, id: string) => {
    const idNum = parseInt(id, 10);
    if (!professoresSelecionados.includes(idNum)) {
      onProfessorChange([...professoresSelecionados, idNum]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleRemoveTag = (id: number) => {
    onProfessorChange(professoresSelecionados.filter((item) => item !== id));
  };

  return (
    <div className={`relative w-[230px] ${className}`}>
      <Input
        type="text"
        value={inputValue}
        placeholder="Digite o nome do professor"
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
      />
      {showSuggestions && filtered.length > 0 && (
        <ul className="absolute z-10 w-full bg-popover border mt-1 rounded shadow">
          {filtered.map((p) => (
            <li
              key={p.id}
              className="px-3 py-1 hover:bg-muted cursor-pointer"
              onClick={() => handleSelect(p.nome, p.id.toString())}
            >
              {p.nome}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-2 flex flex-wrap gap-2">
        {professoresSelecionados.map((id) => {
          const professor = professores.find((p) => p.id === id);
          return (
            professor && (
              <div
                key={id}
                className="px-2 mt-2 py-2 bg-primary text-primary-foreground rounded-md text-sm flex items-center"
              >
                <span>{professor.nome}</span>
                <button
                  onClick={() => handleRemoveTag(id)}
                  className="ml-2 cursor-pointer text-primary-foreground"
                >
                  <X size={16} />
                </button>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
