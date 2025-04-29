import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { IconEdit, IconTrash } from "@tabler/icons-react"

type Column = {
  key: string;
  label: string;
  alignRight?: boolean;
};

type DataTableProps = {
  columns: Column[];
  data: Record<string, any>[];
};

export function DataTable({ columns, data }: DataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className={col.alignRight ? "text-right" : ""}
            >
              {col.label}
            </TableHead>
          ))}
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                className={col.alignRight ? "text-right" : ""}
              >
                {row[col.key]}
              </TableCell>
            ))}
            <TableCell className="text-right">
              <div className="flex justify-end gap-1.5">
                <Button variant="outline"><IconEdit /></Button>
                <Button variant="destructive"><IconTrash /></Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
