"""empty message

Revision ID: 95f9ecc4c7dd
Revises: edfc4b143cc8
Create Date: 2018-07-01 15:22:55.968579

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '95f9ecc4c7dd'
down_revision = 'edfc4b143cc8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bloopers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.String(length=65535), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_foreign_key(None, 'comments', 'posts', ['postid'], ['id'])
    op.create_foreign_key(None, 'comments', 'users', ['userid'], ['id'])
    op.create_foreign_key(None, 'downvotes', 'posts', ['postid'], ['id'])
    op.create_foreign_key(None, 'downvotes', 'users', ['userid'], ['id'])
    op.create_foreign_key(None, 'posts', 'users', ['userid'], ['id'])
    op.create_foreign_key(None, 'upvotes', 'users', ['userid'], ['id'])
    op.create_foreign_key(None, 'upvotes', 'posts', ['postid'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'upvotes', type_='foreignkey')
    op.drop_constraint(None, 'upvotes', type_='foreignkey')
    op.drop_constraint(None, 'posts', type_='foreignkey')
    op.drop_constraint(None, 'downvotes', type_='foreignkey')
    op.drop_constraint(None, 'downvotes', type_='foreignkey')
    op.drop_constraint(None, 'comments', type_='foreignkey')
    op.drop_constraint(None, 'comments', type_='foreignkey')
    op.drop_table('bloopers')
    # ### end Alembic commands ###
