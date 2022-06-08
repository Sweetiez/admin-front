import { useQuery } from 'react-query';
import { authenticatedRequest } from '../common/request';
import ReportModel from '../../components/Reports/models/ReportModel';

export function useReports() {
  return useQuery<ReportModel[], Error>(`all-reports`, async () => {
    const { data } = await authenticatedRequest({
      url: `admin/reports`,
    });
    return data;
  });
}

export async function deleteEvalutaion(reportId: string) {
  if (reportId) {
    return await authenticatedRequest({
      url: `admin/reports/${reportId}`,
      method: 'DELETE',
    });
  }
}

export async function cancelReport(reportId: string) {
  if (reportId) {
    return await authenticatedRequest({
      url: `admin/reports/${reportId}/spam`,
      method: 'DELETE',
    });
  }
}
