import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

export default function TaskSkeleton() {
  return (
    <Card sx={{ display: "flex", p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} mb={2}>
          <Skeleton variant="text" sx={{ fontSize: 36 }} />
        </Grid>
        <Grid item xs={12} mb={2}>
          <Skeleton variant="rectangular" height={36} />
        </Grid>
        <Grid item xs={12} mb={2}>
          <Skeleton variant="rectangular" height={36} />
        </Grid>
        <Grid item xs={12} md={6} mb={2}>
          <Skeleton variant="rectangular" height={100} />
        </Grid>
        <Grid container item xs={12} md={6} spacing={2}>
          <Grid item>
            <Skeleton variant="circular" width={24} height={24} />
          </Grid>
          <Grid item>
            <Skeleton variant="circular" width={24} height={24} />
          </Grid>
          <Grid item>
            <Skeleton variant="circular" width={24} height={24} />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
