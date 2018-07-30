import fetchApi from '../fetchApi'

export const problem = {
    body: (id) => {
        return fetchApi(`/problems/${id}/`, null, 'get')
    },
    history: (id, config) => {
        return fetchApi(`/problems/${id}/judge-results/`, null, 'get', config||{})
    },
    judge: (problem_id, judge_id) => {
        return fetchApi(`/problems/${problem_id}/judge-results/${judge_id}/`, null, 'get')
    },
    rank: (id) => {
        return fetchApi(`/problems/${id}/ranks/`, null, 'get')
    },
    submission: (problem_id, submission_id) => {
        return fetchApi(`/problems/${problem_id}/submissions/${submission_id}/`, null, 'get')
    },
    upload: (problem_id, file) => {
        let formData = new FormData();
        const langMapper = {
            'cpp': 'c++',
            'java': 'java',
            'py': 'python3',
            'go': 'go',
        }

        if(!langMapper.hasOwnProperty(file.name.split('.')[file.name.split('.').length-1])){
            throw{
                data: 'No match File'
            }
        }

        formData.append('lang', langMapper[file.name.split('.')[file.name.split('.').length-1]])
        formData.append('submission_data', file)
        formData.append('problem', problem_id)
        return fetchApi(`/problems/${problem_id}/submissions/`, formData , 'post', {}, {}, 'multipart/form-data')
    }
}

