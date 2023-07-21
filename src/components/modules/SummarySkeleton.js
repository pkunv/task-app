import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

export default function TaskSkeleton() {
  return (
    <Card sx={{ display: "flex", p: 2 }}>
      <Grid container spacing={2}>
        <Skeleton variant="rectangular" width={50} height={20} />
      </Grid>
    </Card>
  );
}
