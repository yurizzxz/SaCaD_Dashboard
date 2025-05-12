import { Curso } from "@/lib/types";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";

interface CursoSelectProps {
  cursosSelecionados: number[];
  onCursoChange: (cursosIds: number[]) => void;
  className?: string;
}

export function FormCursoInput({
  cursosSelecionados,
  onCursoChange,
  className,
}: CursoSelectProps) {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetch("http://localhost:99/cursos")
      .then((res) => res.json())
      .then((data: Curso[]) => setCursos(data))
      .catch((err) => console.error("Erro ao buscar cursos:", err));
  }, []);

  const filtered = cursos.filter((c) =>
    c.nome_curso.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (_nome: string, id: string) => {
    const idNum = parseInt(id, 10);
    if (!cursosSelecionados.includes(idNum)) {
      onCursoChange([...cursosSelecionados, idNum]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleRemoveTag = (id: number) => {
    onCursoChange(cursosSelecionados.filter((item) => item !== id));
  };

  return (
    <div className={`relative w-[230px] ${className}`}>
      <Input
        type="text"
        value={inputValue}
        placeholder="Digite o nome do curso"
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
      />
      {showSuggestions && filtered.length > 0 && (
        <ul className="absolute z-10 w-full bg-popover border mt-1 rounded shadow">
          {filtered.map((c) => (
            <li
              key={c.id}
              className="px-3 py-1 hover:bg-muted cursor-pointer"
              onClick={() => handleSelect(c.nome_curso, c.id.toString())}
            >
              {c.nome_curso}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-2 flex flex-wrap gap-2">
        {cursosSelecionados.map((id) => {
          const curso = cursos.find((c) => c.id === id);
          return (
            curso && (
              <div
                key={id}
                className="px-2 mt-2 py-2 bg-primary text-primary-foreground rounded-md text-sm flex items-center"
              >
                <span>{curso.nome_curso}</span>
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
