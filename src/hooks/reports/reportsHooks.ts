import { useQuery } from 'react-query';
import { authenticatedRequest } from '../common/request';
import ReportModel from '../../components/Reports/models/ReportModel';
import EvaluationModel from '../../components/Reports/models/EvaluationModel';

export function useReports() {
  return useQuery<ReportModel[], Error>(`all-reports`, async () => {
    const { data } = await authenticatedRequest({
      url: `admin/reports`,
    });
    return data;
  });
}

export function useEvaluationById(id: string) {
  return useQuery<EvaluationModel, Error>(`evaluation-${id}`, async () => {
    if (id) {
      const { data } = await authenticatedRequest({
        url: `evaluations/${id}`,
      });
      return data;
    }
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
