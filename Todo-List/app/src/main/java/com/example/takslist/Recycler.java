package com.example.takslist;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.util.Log;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.RecyclerView;

import com.example.takslist.Adapter.Adapter;

public class Recycler extends ItemTouchHelper.SimpleCallback {

    private Adapter adapter;

    public Recycler(Adapter adapter){
        super(0, (ItemTouchHelper.LEFT | ItemTouchHelper.RIGHT));
        this.adapter = adapter;
    }

    @Override
    public boolean onMove(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder, RecyclerView.ViewHolder target){
        return false;
    }

    @Override
    public void onSwiped(@NonNull final RecyclerView.ViewHolder viewHolder, int direction){
        final int position = viewHolder.getAdapterPosition();
        if(direction == ItemTouchHelper.LEFT){
            AlertDialog.Builder builder = new AlertDialog.Builder(adapter.getContext());
            builder.setTitle("Supprimer la tache");
            builder.setMessage("Voulez-vous vraiment supprimer cette tache ?");
            builder.setPositiveButton("Supprimer",
                    new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            adapter.deleteItem(position);
                            dialog.dismiss();
                        }
                    });
            builder.setNegativeButton("Annuler", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    adapter.notifyItemChanged(viewHolder.getAdapterPosition());
                    dialog.dismiss();
                }
            });

            AlertDialog dialog = builder.create();
            dialog.show();
        }
        else{
            adapter.editItme(position);
        }
    }

    @Override
    public void onChildDraw(Canvas c, RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder, float dX, float dY, int actionstate, boolean isCurrentlyActive){
        super.onChildDraw(c, recyclerView, viewHolder, dX, dY, actionstate, isCurrentlyActive);

        Drawable icon;
        ColorDrawable background;

        View itemView = viewHolder.itemView;
        int backgroundCornerOffset = 20;

        if(dX>0){
            icon = ContextCompat.getDrawable(adapter.getContext(), R.drawable.ic_baseline_edit);
            background = new ColorDrawable(ContextCompat.getColor(adapter.getContext(), R.color.colorPrimaryDark));
        }
        else{
            icon = ContextCompat.getDrawable(adapter.getContext(), R.drawable.ic_baseline_delete);
            background = new ColorDrawable(Color.RED);
        }

        int iconMargin = (itemView.getHeight() - icon.getIntrinsicHeight()) /2;
        int iconTop = itemView.getTop()+ (itemView.getHeight() - icon.getIntrinsicHeight())/ 2;
        int iconBottom = iconTop + icon.getIntrinsicHeight();

        if(dX>0){
            int iconLeft = itemView.getLeft() + iconMargin;
            int iconRight = itemView.getLeft() + iconMargin + icon.getIntrinsicWidth();
            icon.setBounds(iconLeft, iconTop, iconRight, iconBottom);

            background.setBounds(itemView.getLeft(), itemView.getTop(), itemView.getLeft() + ((int)dX) + backgroundCornerOffset, itemView.getBottom());
        }
        else if (dX<0){
            int iconLeft = itemView.getRight() - iconMargin - icon.getIntrinsicWidth() ;
            int iconRight = itemView.getRight() - iconMargin;
            icon.setBounds(iconLeft, iconTop, iconRight, iconBottom);

            background.setBounds(itemView.getRight() + ((int)dX) - backgroundCornerOffset, itemView.getTop(), itemView.getRight(), itemView.getBottom());
        }
        else{
            background.setBounds(0,0,0,0);
        }
        background.draw(c);
        icon.draw(c);
    }

}
