import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const emails = [
  {
    id: 1,
    recipient: "user@example.com",
    status: "Delivered",
    date: "2 mins ago",
  },
  {
    id: 2,
    recipient: "user@example.com",
    status: "Delivered",
    date: "15 mins ago",
  },
  {
    id: 3,
    recipient: "user@example.com",
    status: "Bounced",
    date: "1 hour ago",
  },
];

function StatusBadge({ status }) {
  const isDelivered = status === "Delivered";
  return (
    <Badge
      variant="outline"
      className={
        isDelivered
          ? "border-green-200 bg-green-50 text-green-700"
          : "border-red-200 bg-red-50 text-red-700"
      }
    >
      {status}
    </Badge>
  );
}

export default function RecentEmailsTable() {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm w-full max-w-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-900">Recent Emails</h2>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
          View All
        </button>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="border-0">
            <TableHead className="text-xs text-gray-500 font-medium pl-0">
              Recipient
            </TableHead>
            <TableHead className="text-xs text-gray-500 font-medium">
              Status
            </TableHead>
            <TableHead className="text-xs text-gray-500 font-medium text-right pr-0">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emails.map((email) => (
            <TableRow key={email.id} className="border-0 hover:bg-gray-50">
              <TableCell className="text-sm text-gray-700 pl-0 py-3">
                {email.recipient}
              </TableCell>
              <TableCell className="py-3">
                <StatusBadge status={email.status} />
              </TableCell>
              <TableCell className="text-sm text-gray-500 text-right pr-0 py-3">
                {email.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
