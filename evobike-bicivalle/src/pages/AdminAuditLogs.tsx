import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, AlertTriangle, Info, AlertCircle, XCircle } from 'lucide-react';
import { fetchAuditLogs } from '../utils/api';

const AdminAuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadLogs();
  }, [filter]);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const data = await fetchAuditLogs(filter ? { severity: filter } : {});
      setLogs(data.logs);
    } catch (error) {
      console.error('Error loading logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'INFO':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'WARNING':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'ERROR':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'CRITICAL':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const styles: any = {
      INFO: 'bg-blue-100 text-blue-800',
      WARNING: 'bg-yellow-100 text-yellow-800',
      ERROR: 'bg-orange-100 text-orange-800',
      CRITICAL: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[severity]}`}>
        {severity}
      </span>
    );
  };

  const getActionBadge = (action: string) => {
    const colors: any = {
      CREATE_ORDER: 'bg-green-100 text-green-800',
      CONFIRM_PAYMENT: 'bg-purple-100 text-purple-800',
      UPDATE_INVENTORY: 'bg-blue-100 text-blue-800',
      UPDATE_ORDER_STATUS: 'bg-indigo-100 text-indigo-800',
      OVERSELL_PREVENTED: 'bg-red-100 text-red-800',
      CANCEL_ORDER: 'bg-orange-100 text-orange-800',
      LOW_STOCK_ALERT: 'bg-yellow-100 text-yellow-800',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[action] || 'bg-gray-100 text-gray-800'}`}>
        {action.replace(/_/g, ' ')}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Registro de Auditoría</h1>
          <p className="text-gray-600">Historial completo de todas las operaciones críticas del sistema</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === '' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter('CRITICAL')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Críticos
            </button>
            <button
              onClick={() => setFilter('WARNING')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'WARNING' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Advertencias
            </button>
            <button
              onClick={() => setFilter('ERROR')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'ERROR' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Errores
            </button>
            <button
              onClick={() => setFilter('INFO')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'INFO' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Info
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`bg-white rounded-lg p-6 shadow-sm border-l-4 ${
                log.severity === 'CRITICAL' ? 'border-red-500' :
                log.severity === 'ERROR' ? 'border-orange-500' :
                log.severity === 'WARNING' ? 'border-yellow-500' :
                'border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getSeverityIcon(log.severity)}
                  <div>
                    {getActionBadge(log.action)}
                  </div>
                  {getSeverityBadge(log.severity)}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(log.createdAt).toLocaleString('es-CO', {
                    dateStyle: 'short',
                    timeStyle: 'medium',
                  })}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{log.message}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Entidad:</span>{' '}
                  <span className="font-medium text-gray-900">{log.entity}</span>
                </div>
                <div>
                  <span className="text-gray-500">ID:</span>{' '}
                  <span className="font-mono text-gray-900">{log.entityId.slice(0, 12)}...</span>
                </div>
              </div>

              {log.changes && Object.keys(log.changes).length > 0 && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900 font-medium">
                    Ver cambios detallados
                  </summary>
                  <pre className="mt-3 p-4 bg-gray-50 rounded border border-gray-200 text-xs overflow-x-auto">
                    {JSON.stringify(log.changes, null, 2)}
                  </pre>
                </details>
              )}

              {log.metadata && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900 font-medium">
                    Ver metadata
                  </summary>
                  <pre className="mt-3 p-4 bg-gray-50 rounded border border-gray-200 text-xs overflow-x-auto">
                    {JSON.stringify(log.metadata, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>

        {logs.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-lg">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No hay registros de auditoría</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAuditLogs;
