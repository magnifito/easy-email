import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import qs from 'qs';

export function useQuery<T extends { [key: string]: any; }>(): T & {
	patchQuery: (params: T) => string;
} {
	const navigate = useNavigate();
	const { search } = useLocation();

	const query = useMemo(() => {
		return qs.parse(search, {
			ignoreQueryPrefix: true,
		}) as any as { [key: string]: any; };
	}, [search]);

	const patchQuery = useCallback((params: T) => {
		const newSearch = qs.stringify(
			{
				...query,
				...params,
			},
			{
				addQueryPrefix: true,
			}
		);

		navigate({
			search: newSearch,
		});
		return newSearch;
	}, [navigate, query]);

	return { ...query, patchQuery };
}