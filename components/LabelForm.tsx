
import React from 'react';
import { LabelData } from '../types.ts';

interface InputGroupProps {
  label: string;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type?: string;
  placeholder?: string;
}

// Moved outside to maintain component stability and focus
const InputGroup: React.FC<InputGroupProps> = ({ label, name, value, onChange, type = "text", placeholder = "" }) => (
  <div className="flex flex-col">
    <label className="text-[10px] font-bold text-gray-500 uppercase mb-1">{label}</label>
    {type === 'checkbox' ? (
      <div className="flex items-center h-9">
        <input
          type="checkbox"
          name={name}
          checked={value}
          onChange={onChange}
          className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
        />
        <span className="ml-2 text-xs text-gray-600">Aktif</span>
      </div>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
      />
    )}
  </div>
);

interface LabelFormProps {
  data: LabelData;
  onChange: (data: LabelData) => void;
}

const LabelForm: React.FC<LabelFormProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    onChange({ ...data, [name]: val });
  };

  return (
    <div className="space-y-6">
      {/* Kode Utama & Identitas Pengiriman */}
      <section>
        <h3 className="text-xs font-black text-orange-600 uppercase tracking-wider mb-3 border-b pb-1">Identitas Utama</h3>
        <div className="grid grid-cols-2 gap-4">
          <InputGroup label="Main Code" name="mainCode" value={data.mainCode} onChange={handleChange} />
          <InputGroup label="Hub Sub Code" name="hubSubCode" value={data.hubSubCode} onChange={handleChange} />
          <InputGroup label="Nomor Resi" name="resiNumber" value={data.resiNumber} onChange={handleChange} />
          <InputGroup label="Layanan" name="serviceType" value={data.serviceType} onChange={handleChange} />
        </div>
      </section>

      {/* Penerima */}
      <section>
        <h3 className="text-xs font-black text-blue-600 uppercase tracking-wider mb-3 border-b pb-1">Data Penerima</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <InputGroup label="Nama Penerima" name="recipientName" value={data.recipientName} onChange={handleChange} />
          <InputGroup label="Telepon Penerima" name="recipientPhone" value={data.recipientPhone} onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] font-bold text-gray-500 uppercase mb-1">Alamat Lengkap Penerima</label>
          <textarea
            name="recipientAddress"
            value={data.recipientAddress}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />
        </div>
      </section>

      {/* Pengirim */}
      <section>
        <h3 className="text-xs font-black text-green-600 uppercase tracking-wider mb-3 border-b pb-1">Data Pengirim</h3>
        <div className="grid grid-cols-2 gap-4">
          <InputGroup label="Nama Pengirim" name="senderName" value={data.senderName} onChange={handleChange} />
          <InputGroup label="Telepon Pengirim" name="senderPhone" value={data.senderPhone} onChange={handleChange} />
          <div className="col-span-2">
            <InputGroup label="Kota Asal Pengirim" name="senderCity" value={data.senderCity} onChange={handleChange} />
          </div>
        </div>
      </section>

      {/* Tag Lokasi */}
      <section>
        <h3 className="text-xs font-black text-purple-600 uppercase tracking-wider mb-3 border-b pb-1">Tag Lokasi</h3>
        <div className="grid grid-cols-3 gap-3">
          <InputGroup label="Kabupaten" name="district" value={data.district} onChange={handleChange} />
          <InputGroup label="Kecamatan" name="subDistrict" value={data.subDistrict} onChange={handleChange} />
          <InputGroup label="Kelurahan" name="village" value={data.village} onChange={handleChange} />
        </div>
      </section>

      {/* Informasi Tambahan */}
      <section>
        <h3 className="text-xs font-black text-gray-600 uppercase tracking-wider mb-3 border-b pb-1">Informasi Paket</h3>
        <div className="grid grid-cols-2 gap-4">
          <InputGroup label="Berat" name="weight" value={data.weight} onChange={handleChange} />
          <InputGroup label="COD Cek Dulu" name="codCekDulu" value={data.codCekDulu} onChange={handleChange} />
          <InputGroup label="Batas Kirim" name="batasKirim" value={data.batasKirim} onChange={handleChange} />
          <InputGroup label="No. Pesanan" name="orderId" value={data.orderId} onChange={handleChange} />
          <InputGroup label="Watermark" name="watermark" value={data.watermark} onChange={handleChange} />
          <InputGroup label="Cashless" name="isCashless" value={data.isCashless} onChange={handleChange} type="checkbox" />
        </div>
      </section>
    </div>
  );
};

export default LabelForm;
