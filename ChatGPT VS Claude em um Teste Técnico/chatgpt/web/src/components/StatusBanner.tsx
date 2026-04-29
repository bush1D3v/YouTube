type StatusBannerProps = {
  type: 'error' | 'success';
  message: string;
};

export function StatusBanner({ type, message }: StatusBannerProps) {
  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
        type === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'
      }`}
    >
      {message}
    </div>
  );
}
