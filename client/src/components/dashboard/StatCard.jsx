import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl bg-white p-6 shadow-sm transition"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>
        </div>

        <div
          className={`rounded-xl p-4 ${color}`}
        >
          <Icon className="text-white" size={26} />
        </div>
      </div>
    </motion.div>
  );
}