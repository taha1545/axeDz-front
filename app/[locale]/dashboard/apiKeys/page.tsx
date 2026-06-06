"use client";
import { useState, FC, SVGProps } from "react";
import {
  ShieldCogCorner,
  CircleCheckBig,
  Check,
  Copy,
  Eye,
  EllipsisVertical,
  Plus,
  Trash,
  ChevronDown,
  Key,
  Monitor,
  FileText,
  Lock,
  Zap,
  Globe,
} from "lucide-react";
/* ─── Types ──────────────────────────────────────────────── */
type KeyStatus = "Active" | "Revoked";
type Permission = "Full Access" | "Read Only";

interface ProductionKey {
  id: number;
  name: string;
  created: string;
  key: string;
  permission: Permission;
  status: KeyStatus;
}

interface DevKey {
  id: number;
  name: string;
  created: string;
  key: string;
  lastUsed: string;
  status: KeyStatus;
}

interface IpAddress {
  id: number;
  ip: string;
  label: string;
}

interface Resource {
  icon: FC<SVGProps<SVGSVGElement>>;
  label: string;
}

interface StatusBadgeProps {
  status: KeyStatus;
}
interface PermissionBadgeProps {
  permission: Permission;
}
interface ProductionKeyRowProps {
  row: ProductionKey;
}
interface DevKeyRowProps {
  row: DevKey;
}

/* ─── Static data ────────────────────────────────────────── */
const PRODUCTION_KEYS: ProductionKey[] = [
  {
    id: 1,
    name: "Production Default",
    created: "Jun 01, 2026",
    key: "re_live_••••••••••x7a2",
    permission: "Full Access",
    status: "Active",
  },
  {
    id: 2,
    name: "Marketing Website",
    created: "May 01, 2026",
    key: "re_live_••••••••••m9b1",
    permission: "Read Only",
    status: "Active",
  },
];

const DEV_KEYS: DevKey[] = [
  {
    id: 3,
    name: "Staging Environment",
    created: "Jun 01, 2026",
    key: "re_test_••••••••••d4v2",
    lastUsed: "2 hours ago",
    status: "Revoked",
  },
];

const INITIAL_IPS: IpAddress[] = [
  { id: 1, ip: "192.168.1.1", label: "Office Main Fiber" },
  { id: 2, ip: "45.23.11.89", label: "El Bayadh (DZ–El-Bayadh)" },
];

const RESOURCES: Resource[] = [
  { icon: FileText, label: "Authentication Guide" },
  { icon: Lock, label: "Secret Management" },
  { icon: Zap, label: "Quickstart SDKs" },
];

const CHECKLIST: string[] = [
  "Never commit API keys to version control systems like Git.",
  "Rotate your secret keys every 90 days to minimize risk.",
  "Use environment variables for server-side implementations.",
];

/* ─── Badge components ───────────────────────────────────── */
const STATUS_STYLES: Record<KeyStatus, string> = {
  Active: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  Revoked: "bg-rose-50    text-rose-500    border border-rose-100",
};
const DOT_STYLES: Record<KeyStatus, string> = {
  Active: "bg-emerald-500",
  Revoked: "bg-rose-400",
};

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${STATUS_STYLES[status]}`}
  >
    <span className={`w-1.5 h-1.5 rounded-full ${DOT_STYLES[status]}`} />
    {status}
  </span>
);

const PERMISSION_STYLES: Record<Permission, string> = {
  "Full Access": "bg-indigo-50 text-indigo-600 border border-indigo-100",
  "Read Only": "bg-slate-100 text-slate-500  border border-slate-200",
};

const PermissionBadge: FC<PermissionBadgeProps> = ({ permission }) => (
  <span
    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md ${PERMISSION_STYLES[permission]}`}
  >
    {permission}
  </span>
);

/* ─── Key row for Production table ──────────────────────── */
const ProductionKeyRow: FC<ProductionKeyRowProps> = ({ row }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (): void => {
    void navigator.clipboard.writeText(row.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50/60 transition-colors group">
      <td className="py-4 px-4">
        <p className="text-[13px] font-semibold text-slate-700 leading-snug">
          {row.name}
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Created {row.created}
        </p>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[11.5px] text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
            {row.key}
          </span>
          <button
            className="text-slate-300 hover:text-indigo-500 transition-colors"
            title="Reveal"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={handleCopy}
            title="Copy"
            className={`transition-colors ${copied ? "text-emerald-500" : "text-slate-300 hover:text-indigo-500"}`}
          >
            {copied ? <Check /> : <Copy size={18} />}
          </button>
        </div>
      </td>
      <td className="py-4 px-4">
        <PermissionBadge permission={row.permission} />
      </td>
      <td className="py-4 px-4">
        <StatusBadge status={row.status} />
      </td>
      <td className="py-4 px-4">
        <button className="text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all">
          <EllipsisVertical />
        </button>
      </td>
    </tr>
  );
};

/* ─── Key row for Development table ─────────────────────── */
const DevKeyRow: FC<DevKeyRowProps> = ({ row }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = (): void => {
    void navigator.clipboard.writeText(row.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50/60 transition-colors group">
      <td className="py-4 px-4">
        <p className="text-[13px] font-semibold text-slate-700 leading-snug">
          {row.name}
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Created {row.created}
        </p>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[11.5px] text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
            {row.key}
          </span>
          <button
            className="text-slate-300 hover:text-indigo-500 transition-colors"
            title="Reveal"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={handleCopy}
            title="Copy"
            className={`transition-colors ${copied ? "text-emerald-500" : "text-slate-300 hover:text-indigo-500"}`}
          >
            {copied ? <Check /> : <Copy size={18} />}
          </button>
        </div>
      </td>
      <td className="py-4 px-4 text-[12px] text-slate-400">{row.lastUsed}</td>
      <td className="py-4 px-4">
        <StatusBadge status={row.status} />
      </td>
      <td className="py-4 px-4">
        <button className="text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all">
          <EllipsisVertical />
        </button>
      </td>
    </tr>
  );
};

/* ─── Main page ──────────────────────────────────────────── */
const ApiKeysPage: FC = () => {
  const [ips, setIps] = useState<IpAddress[]>(INITIAL_IPS);

  const removeIp = (id: number): void =>
    setIps((prev) => prev.filter((a) => a.id !== id));

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`}</style>

      <div
        className="min-h-screen bg-[#f5f6fa] px-6 py-8"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="max-w-5xl mx-auto">
          {/* ── Header ── */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                API Keys
              </h1>
              <p className="text-[13px] text-slate-400 mt-0.5">
                Manage your public and secret keys to authenticate API requests.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-200">
              <Plus size={18} /> Create New Key
            </button>
          </div>

          <div className="flex gap-5 items-start">
            {/* ── Left column ── */}
            <div className="flex-1 min-w-0 space-y-5">
              {/* Production Keys */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Key className="w-4 h-4 text-indigo-500" />
                  <h2 className="text-[14.5px] font-semibold text-slate-700">
                    Production Keys
                  </h2>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50/80">
                        {["Name", "Key", "Permissions", "Status", ""].map(
                          (h) => (
                            <th
                              key={h}
                              className="text-left text-[10.5px] font-semibold text-slate-400 uppercase tracking-widest px-4 py-3"
                            >
                              {h}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {PRODUCTION_KEYS.map((row) => (
                        <ProductionKeyRow key={row.id} row={row} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Development Keys */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Monitor className="w-4 h-4 text-slate-400" />
                  <h2 className="text-[14.5px] font-semibold text-slate-700">
                    Development Keys
                  </h2>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50/80">
                        {["Name", "Key", "Last Used", "Status", ""].map((h) => (
                          <th
                            key={h}
                            className="text-left text-[10.5px] font-semibold text-slate-400 uppercase tracking-widest px-4 py-3"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {DEV_KEYS.map((row) => (
                        <DevKeyRow key={row.id} row={row} />
                      ))}
                    </tbody>
                  </table>
                  <div className="border-t border-slate-100 py-3 text-center">
                    <button className="text-[12.5px] font-medium text-indigo-500 hover:text-indigo-700 transition-colors">
                      view all 5 development keys
                    </button>
                  </div>
                </div>
              </section>

              {/* IP Whitelisting */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <h2 className="text-[14.5px] font-semibold text-slate-700">
                      IP Whitelisting
                    </h2>
                  </div>
                  <button className="text-[12px] font-semibold text-indigo-500 hover:text-indigo-700 transition-colors">
                    Add Address
                  </button>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                  <p className="text-[12.5px] text-slate-400 mb-4 leading-relaxed">
                    Restrict API access to specific IP addresses to increase the
                    security of your production environment.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ips.map((addr) => (
                      <div
                        key={addr.id}
                        className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5"
                      >
                        <div>
                          <p
                            className="text-[12.5px] font-semibold text-slate-600"
                            style={{ fontFamily: "'DM Mono', monospace" }}
                          >
                            {addr.ip}
                          </p>
                          <p className="text-[10.5px] text-slate-400">
                            {addr.label}
                          </p>
                        </div>
                        <button
                          onClick={() => removeIp(addr.id)}
                          className="text-slate-300 hover:text-rose-400 transition-colors ml-1"
                          aria-label={`Remove ${addr.ip}`}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    ))}
                    <button className="flex items-center justify-center w-10 h-[52px] border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:text-indigo-400 text-slate-300 rounded-xl transition-colors">
                      <Plus />
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* ── Right sidebar ── */}
            <div className="w-56 shrink-0 space-y-4">
              {/* Security Checklist */}
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-5 text-white shadow-lg shadow-indigo-200">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                  <ShieldCogCorner className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-[14px] font-bold mb-1">
                  Security Checklist
                </h3>
                <p className="text-[11.5px] text-indigo-100 leading-relaxed mb-4">
                  Keep your integration secure by following industry standard
                  best practices.
                </p>
                <ul className="space-y-2.5">
                  {CHECKLIST.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CircleCheckBig className="w-3.5 h-3.5 text-indigo-200 mt-0.5 shrink-0" />
                      <span className="text-[11px] text-indigo-100 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Resources
                </p>
                <ul className="space-y-0.5">
                  {RESOURCES.map(({ icon: Icon, label }) => (
                    <li key={label}>
                      <button className="w-full flex items-center justify-between px-2 py-2 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="text-[12.5px] font-medium text-slate-600 group-hover:text-indigo-600 transition-colors">
                            {label}
                          </span>
                        </div>
                        <ChevronDown />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Infrastructure Status */}
              <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                <div className="h-20 bg-gradient-to-br from-slate-300 to-slate-500 relative">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.3'%3E%3Crect x='0' y='0' width='1' height='40'/%3E%3Crect x='0' y='0' width='40' height='1'/%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                  />
                </div>
                <div className="bg-white px-3.5 py-3">
                  <p className="text-[9.5px] font-bold text-indigo-500 uppercase tracking-widest mb-0.5">
                    Infrastructure Status
                  </p>
                  <p className="text-[12px] font-semibold text-slate-700">
                    All systems operational in DZ-El Bayadh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApiKeysPage;
