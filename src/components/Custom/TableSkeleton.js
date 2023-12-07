import { Skeleton, Typography } from "@mui/material";

const TableSkeleton = () => {
  return (
    <div className="page-content">
      <Typography variant="h4">
        <Skeleton width={200} animation="wave" />
      </Typography>
      <Skeleton
        variant="rectangular"
        height={40}
        sx={{ marginY: 2 }}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        height={40}
        sx={{ marginY: 2 }}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        height={40}
        sx={{ marginY: 2 }}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        height={40}
        sx={{ marginY: 2 }}
        animation="wave"
      />
      <Skeleton
        variant="rectangular"
        height={40}
        sx={{ marginY: 2 }}
        animation="wave"
      />
    </div>
  );
};

export default TableSkeleton;
