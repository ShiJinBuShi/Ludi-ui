import { useEffect, useState } from 'react';

// Existing API contract:
// query({ status }) -> Promise<Array<{ id, name }>>
// exportRows({ status }) -> Promise<void>; server checks authorization.
// removePermanently(id) -> Promise<void>; no restore endpoint exists.
export function AdminPanel({ query, exportRows, removePermanently }) {
  const [status, setStatus] = useState('all');
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');
  const [notice, setNotice] = useState('');

  const load = () => query({ status }).then(setRows);
  useEffect(() => { load(); }, [status]);

  const remove = async id => {
    await removePermanently(id);
    setRows(rows.filter(row => row.id !== id));
    setNotice('已删除');
    setTimeout(() => setNotice(''), 2000);
  };

  return (
    <main>
      <label>状态
        <select value={status} onChange={event => setStatus(event.target.value)}>
          <option value="all">全部</option>
          <option value="active">启用</option>
          <option value="disabled">禁用</option>
        </select>
      </label>
      <button onClick={load}>查询</button>
      <button onClick={() => exportRows({ status })}>导出明细</button>
      <ul>
        {rows.map(row => <li key={row.id}>
          {row.name}
          <button onClick={() => { setEditing(row); setName(row.name); }}>编辑</button>
          <button onClick={() => remove(row.id)}>永久删除</button>
        </li>)}
      </ul>
      {notice && <div role="status">{notice}<button onClick={() => setNotice('')}>撤销</button></div>}
      {editing && <div className="backdrop" onClick={() => setEditing(null)}>
        <div role="dialog" onClick={event => event.stopPropagation()}>
          <input value={name} onChange={event => setName(event.target.value)} />
          <button onClick={() => setEditing(null)}>关闭</button>
        </div>
      </div>}
    </main>
  );
}
