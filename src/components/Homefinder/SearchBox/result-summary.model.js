export default class ResultSummary {
  totalResults;

  constructor(data) {
    this.totalResults = data.TotalPlans;
  }
}
