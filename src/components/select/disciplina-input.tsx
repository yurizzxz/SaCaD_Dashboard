import { Disciplina } from "@/lib/types";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";

interface DisciplinaSelectProps {
  disciplinasSelecionadas: number[];
  onDisciplinaChange: (disciplinasIds: number[]) => void;
  className?: string;
}

export function FormDisciplinaInput({
  disciplinasSelecionadas,
  onDisciplinaChange,
  className,
}: DisciplinaSelectProps) {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetch("http://localhost:99/disciplinas")
      .then((res) => res.json())
      .then((data: Disciplina[]) => setDisciplinas(data))
      .catch((err) => console.error("Erro ao buscar disciplinas:", err));
  }, []);

  const filtered = disciplinas.filter((d) =>
    d.nome.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (_nome: string, id: string) => {
    const idNum = parseInt(id, 10);
    if (!disciplinasSelecionadas.includes(idNum)) {
      onDisciplinaChange([...disciplinasSelecionadas, idNum]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleRemoveTag = (id: number) => {
    onDisciplinaChange(disciplinasSelecionadas.filter((item) => item !== id));
  };

  return (
    <div className={`relative w-[230px] ${className}`}>
      <Input
        type="text"
        value={inputValue}
        placeholder="Digite o nome da disciplina"
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
      />
      {showSuggestions && filtered.length > 0 && (
        <ul className="absolute z-10 w-full bg-popover border mt-1 rounded shadow">
          {filtered.map((d) => (
            <li
              key={d.id}
              className="px-3 py-1 hover:bg-muted cursor-pointer"
              onClick={() => handleSelect(d.nome, d.id.toString())}
            >
              {d.nome}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-2 flex flex-wrap gap-2">
        {disciplinasSelecionadas.map((id) => {
          const disciplina = disciplinas.find((d) => d.id === id);
          return (
            disciplina && (
              <div
                key={id}
                className="px-2 mt-2 py-2 bg-primary text-primary-foreground rounded-md text-sm flex items-center"
              >
                <span>{disciplina.nome}</span>
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
